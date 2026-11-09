/** Axis Refined v4 retains the v3 bounds and dot; the stem scoops inward. */
export const NOI_MOTION_DURATION = 2800;
export const NOI_DOT_FINAL = { x: 121.5, y: 891 } as const;
export const NOI_DOT_TOP = { x: 121.5, y: -56 } as const;

export const NOI_DOT_ORBIT = {
  centerX: NOI_DOT_TOP.x,
  centerY: (NOI_DOT_TOP.y + NOI_DOT_FINAL.y) / 2,
  radius: (NOI_DOT_FINAL.y - NOI_DOT_TOP.y) / 2,
} as const;
export const NOI_DOT_VIEWBOX_WIDTH = 700;

/** One continuous right-hand semicircle, reversed when scrolling back. */
export function getScrollDotPosition(progress: number) {
  const t = Math.max(0, Math.min(1, progress));
  if (t === 0) return NOI_DOT_FINAL;
  if (t === 1) return NOI_DOT_TOP;
  const angle = Math.PI * t;
  return {
    x: NOI_DOT_ORBIT.centerX + NOI_DOT_ORBIT.radius * Math.sin(angle),
    y: NOI_DOT_ORBIT.centerY + NOI_DOT_ORBIT.radius * Math.cos(angle),
  };
}

/** Brief contact/bounce, a clear path around the stem, then a small settle.
 * Coordinates use the font's baseline; the circle never changes shape. */
export function getNoiDotPosition(progress: number) {
  const t = Math.max(0, Math.min(1, progress));
  if (t < 0.14) {
    return { x: 121.5, y: -56 + 55 * (t / 0.14) ** 2 };
  }
  if (t < 0.36) {
    const u = (t - 0.14) / 0.22;
    return { x: 121.5, y: -1 - 100 * 4 * u * (1 - u) };
  }
  if (t < 0.44) {
    const u = (t - 0.36) / 0.08;
    return { x: NOI_DOT_TOP.x, y: -1 - 55 * u * u * (3 - 2 * u) };
  }
  if (t < 0.9) {
    const u = (t - 0.44) / 0.46;
    return getScrollDotPosition(1 - u * u * (3 - 2 * u));
  }
  const u = (t - 0.9) / 0.1;
  return { x: 121.5, y: 891 - 14 * Math.sin(Math.PI * u) * (1 - u) ** 2 };
}
