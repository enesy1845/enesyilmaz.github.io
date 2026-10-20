import { describe, expect, it } from "vitest";

import {
  getNoiDotPosition,
  getScrollDotPosition,
  NOI_DOT_FINAL,
  NOI_DOT_TOP,
  NOI_DOT_ORBIT,
  NOI_DOT_VIEWBOX_WIDTH,
} from "@/components/brand/noi-motion.utils";

describe("NOI Axis dot motion", () => {
  it("moves upwards with docking progress, reversibly and without a bounce", () => {
    expect(getScrollDotPosition(0)).toEqual(NOI_DOT_FINAL);
    expect(getScrollDotPosition(1)).toEqual(NOI_DOT_TOP);
    let previousY = NOI_DOT_FINAL.y as number;
    for (let step = 0; step <= 1000; step += 1) {
      const { x, y } = getScrollDotPosition(step / 1000);
      expect(
        Math.hypot(x - NOI_DOT_ORBIT.centerX, y - NOI_DOT_ORBIT.centerY),
      ).toBeCloseTo(NOI_DOT_ORBIT.radius, 8);
      expect(x + 87).toBeLessThan(NOI_DOT_VIEWBOX_WIDTH);
      expect(y).toBeLessThanOrEqual(previousY + 0.000001);
      previousY = y;
      const nearestX = Math.max(33, Math.min(210, x));
      const nearestY = Math.max(86, Math.min(790, y));
      expect(Math.hypot(x - nearestX, y - nearestY)).toBeGreaterThanOrEqual(87);
    }
  });
  it("starts above the aligned stem and always finishes centered below it", () => {
    expect(getNoiDotPosition(0)).toEqual({ x: 121.5, y: -56 });
    expect(getNoiDotPosition(1)).toEqual(NOI_DOT_FINAL);
    expect(getNoiDotPosition(2)).toEqual(NOI_DOT_FINAL);
    expect(NOI_DOT_FINAL.y - 87 - 790).toBe(14);
  });

  it("keeps the round dot clear of the stem throughout its path", () => {
    for (let step = 0; step <= 1000; step += 1) {
      const { x, y } = getNoiDotPosition(step / 1000);
      const nearestX = Math.max(33, Math.min(210, x));
      const nearestY = Math.max(86, Math.min(790, y));
      expect(Math.hypot(x - nearestX, y - nearestY)).toBeGreaterThanOrEqual(
        87 - 0.001,
      );
      expect(x + 87).toBeLessThan(NOI_DOT_VIEWBOX_WIDTH);
      expect(y - 87).toBeGreaterThan(-230);
      expect(y + 87).toBeLessThan(1110);
    }
  });

  it("joins each bounce and flight segment without positional jumps", () => {
    for (const boundary of [0.14, 0.36, 0.44, 0.9]) {
      const before = getNoiDotPosition(boundary - 0.000001);
      const after = getNoiDotPosition(boundary + 0.000001);
      expect(Math.hypot(after.x - before.x, after.y - before.y)).toBeLessThan(
        0.02,
      );
    }
  });
});
