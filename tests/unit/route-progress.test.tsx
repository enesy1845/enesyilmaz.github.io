/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors stand in for the HTML next/link renders. */
import { act, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { RouteProgress } from "@/components/navigation/route-progress";

const navigation = vi.hoisted(() => ({ pathname: "/en" }));
vi.mock("next/navigation", () => ({ usePathname: () => navigation.pathname }));

function setup() {
  const view = render(
    <>
      <RouteProgress />
      <a href="/en/work">Work</a>
      <a href="/en#contact">Same page</a>
      <a href="https://example.com/">External</a>
    </>,
  );
  const bar = view.container.querySelector<HTMLElement>(".route-progress");
  if (!bar) throw new Error("bar missing");
  // Keep jsdom on the current page; the router does the real navigation.
  view.container.addEventListener("click", (event) => event.preventDefault());
  return { ...view, bar };
}

describe("RouteProgress", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    navigation.pathname = "/en";
    window.history.replaceState(null, "", "/en");
  });
  afterEach(() => vi.useRealTimers());

  it("shows only for slow navigations and finishes on the new path", () => {
    const { bar, getByText, rerender } = setup();

    fireEvent.click(getByText("Work"));
    expect(bar.dataset.phase).toBe("idle");
    act(() => vi.advanceTimersByTime(150));
    expect(bar.dataset.phase).toBe("loading");

    navigation.pathname = "/en/work";
    rerender(<RouteProgress />);
    expect(bar.dataset.phase).toBe("done");
    act(() => vi.advanceTimersByTime(500));
    expect(bar.dataset.phase).toBe("idle");
  });

  it("stays hidden when the page arrives within the delay", () => {
    const { bar, getByText, rerender } = setup();

    fireEvent.click(getByText("Work"));
    navigation.pathname = "/en/work";
    rerender(<RouteProgress />);
    act(() => vi.advanceTimersByTime(500));
    expect(bar.dataset.phase).toBe("idle");
  });

  it("ignores same-page, external and modified clicks", () => {
    const { bar, getByText } = setup();

    fireEvent.click(getByText("Same page"));
    fireEvent.click(getByText("External"));
    fireEvent.click(getByText("Work"), { metaKey: true });
    act(() => vi.advanceTimersByTime(500));
    expect(bar.dataset.phase).toBe("idle");
  });
});
