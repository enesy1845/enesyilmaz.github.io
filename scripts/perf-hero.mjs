// Measures the home hero sculpture on a running server (use a production
// build: `npm run build && npm run start`). Uses the GPU, so run it locally,
// not in headless CI where WebGL falls back to software rendering.
//
//   npm run perf:hero                       # http://127.0.0.1:3000
//   npm run perf:hero -- http://127.0.0.1:3200
import { chromium } from "@playwright/test";

const origin = process.argv[2] ?? "http://127.0.0.1:3000";
const scenarios = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, dpr: 1, cpu: 1 },
  {
    name: "desktop, Canvas 2D",
    viewport: { width: 1440, height: 900 },
    dpr: 1,
    cpu: 1,
    noWebgl: true,
  },
  {
    name: "mobile, 4x CPU",
    viewport: { width: 390, height: 844 },
    dpr: 3,
    cpu: 4,
    mobile: true,
  },
  {
    name: "mobile, 4x CPU, Canvas 2D",
    viewport: { width: 390, height: 844 },
    dpr: 3,
    cpu: 4,
    mobile: true,
    noWebgl: true,
  },
];

function instrument(noWebgl) {
  const perf = { lcp: 0, cls: 0, longTasks: [], draws: 0 };
  window.__perf = perf;
  const observe = (type, onEntry) =>
    new PerformanceObserver((list) =>
      list.getEntries().forEach(onEntry),
    ).observe({ type, buffered: true });
  observe("largest-contentful-paint", (entry) => (perf.lcp = entry.startTime));
  observe(
    "layout-shift",
    (entry) => !entry.hadRecentInput && (perf.cls += entry.value),
  );
  observe("longtask", (entry) =>
    perf.longTasks.push(Math.round(entry.duration)),
  );
  if (noWebgl) {
    Reflect.deleteProperty(window, "WebGL2RenderingContext");
    return;
  }
  const proto = WebGL2RenderingContext.prototype;
  for (const name of [
    "drawElements",
    "drawArrays",
    "drawElementsInstanced",
    "drawArraysInstanced",
  ]) {
    const original = proto[name];
    proto[name] = function (...args) {
      perf.draws += 1;
      return original.apply(this, args);
    };
  }
}

function sampleFrames() {
  return new Promise((resolve) => {
    const perf = window.__perf;
    const startDraws = perf.draws;
    const times = [];
    let last = performance.now();
    const end = last + 4000;
    function frame(now) {
      times.push(now - last);
      last = now;
      if (now < end) return requestAnimationFrame(frame);
      times.sort((a, b) => a - b);
      resolve({
        fps: Math.round(times.length / 4),
        p95: Number(times[Math.floor(times.length * 0.95)].toFixed(1)),
        draws: Math.round((perf.draws - startDraws) / times.length),
      });
    }
    requestAnimationFrame(frame);
  });
}

const browser = await chromium.launch({
  args: ["--enable-gpu", "--ignore-gpu-blocklist"],
});
const rows = [];
for (const scenario of scenarios) {
  const context = await browser.newContext({
    viewport: scenario.viewport,
    deviceScaleFactor: scenario.dpr,
    isMobile: Boolean(scenario.mobile),
    hasTouch: Boolean(scenario.mobile),
  });
  const page = await context.newPage();
  if (scenario.cpu > 1) {
    const cdp = await context.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: scenario.cpu });
  }
  await page.addInitScript(instrument, Boolean(scenario.noWebgl));
  await page.goto(`${origin}/en`);
  const host = page.locator("[data-sculpture-host]");
  await host
    .and(page.locator(":not([data-sculpture-renderer=none])"))
    .waitFor({ timeout: 20_000 });
  await page.waitForTimeout(2000);
  const renderer = await host.getAttribute("data-sculpture-renderer");
  const frames = await page.evaluate(sampleFrames);
  await page.evaluate(() =>
    window.scrollTo({ top: innerHeight * 2.5, behavior: "instant" }),
  );
  await page.waitForTimeout(1500);
  const offscreenDraws = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const start = window.__perf.draws;
        setTimeout(() => resolve(window.__perf.draws - start), 2000);
      }),
  );
  const load = await page.evaluate(() => ({
    lcp: Math.round(window.__perf.lcp),
    cls: Number(window.__perf.cls.toFixed(3)),
    longestTask: Math.max(0, ...window.__perf.longTasks),
  }));
  rows.push({
    scenario: scenario.name,
    renderer,
    "LCP ms": load.lcp,
    CLS: load.cls,
    "longest task ms": load.longestTask,
    fps: frames.fps,
    "p95 frame ms": frames.p95,
    "draws/frame": scenario.noWebgl ? "-" : frames.draws,
    "off-screen draws": scenario.noWebgl ? "-" : offscreenDraws,
  });
  await context.close();
}
await browser.close();
console.table(rows);
