/**
 * Canvas 2D renderer for the hero sculpture: a twisting stack of thin plates
 * that winds through the frame, echoing the sculptural background film on the
 * AIR reference. Pure drawing code; lifecycle lives in hero-sculpture-canvas.
 */

type Vec3 = [number, number, number];

type Face = {
  depth: number;
  points: Array<[number, number]>;
  shade: number;
};

export type SculptureLayout = {
  centerX: number;
  centerY: number;
  scale: number;
};

const CAMERA_Z = 4.2;
const LIGHT = normalize([-0.35, 0.85, 0.55]);
const PLATE_LENGTH = 1.05;
const PLATE_DEPTH = 0.2;
const PLATE_THICKNESS = 0.026;
const STACK_HEIGHT = 3.1;
const TURNS = 0.62;
const WIND_RADIUS = 0.42;

function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function scaleVec(a: Vec3, s: number): Vec3 {
  return [a[0] * s, a[1] * s, a[2] * s];
}

function dot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function normalize(a: Vec3): Vec3 {
  const length = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / length, a[1] / length, a[2] / length];
}

function rotateY(a: Vec3, angle: number): Vec3 {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [a[0] * c + a[2] * s, a[1], -a[0] * s + a[2] * c];
}

export function getSculptureLayout(
  width: number,
  height: number,
): SculptureLayout {
  if (width < 768 || width / height < 0.9) {
    return {
      centerX: width * 0.6,
      centerY: height * 0.4,
      scale: Math.min(width * 0.62, height * 0.32),
    };
  }

  return {
    centerX: width * 0.3,
    centerY: height * 0.5,
    scale: Math.min(width * 0.28, height * 0.42),
  };
}

function curvePoint(u: number, phase: number): Vec3 {
  const angle = Math.PI * 2 * TURNS * u + phase;
  const sway = Math.sin(u * Math.PI * 1.4 + phase * 0.6) * 0.22;
  return [
    Math.sin(angle) * WIND_RADIUS + sway,
    (0.5 - u) * STACK_HEIGHT,
    Math.cos(angle) * WIND_RADIUS,
  ];
}

function project(
  point: Vec3,
  layout: SculptureLayout,
): { x: number; y: number; depth: number } {
  const perspective = CAMERA_Z / (CAMERA_Z - point[2]);
  return {
    x: layout.centerX + point[0] * layout.scale * perspective,
    y: layout.centerY - point[1] * layout.scale * perspective,
    depth: point[2],
  };
}

function buildPlateFaces(
  u: number,
  time: number,
  layout: SculptureLayout,
  rotation: number,
  faces: Face[],
) {
  const phase = time * 0.18;
  const center = curvePoint(u, phase);
  const ahead = curvePoint(Math.min(1, u + 0.002), phase);
  const behind = curvePoint(Math.max(0, u - 0.002), phase);
  const tangent = normalize([
    ahead[0] - behind[0],
    ahead[1] - behind[1],
    ahead[2] - behind[2],
  ]);

  const twist = Math.PI * 2 * TURNS * u * 1.35 + phase * 1.4 + 0.7;
  const radial: Vec3 = [Math.sin(twist), 0, Math.cos(twist)];
  const depthAxis = normalize(cross(tangent, radial));
  const lengthAxis = normalize(cross(depthAxis, tangent));

  const half = (axis: Vec3, size: number) => scaleVec(axis, size / 2);
  const l = half(lengthAxis, PLATE_LENGTH);
  const d = half(depthAxis, PLATE_DEPTH);
  const t = half(tangent, PLATE_THICKNESS);

  const corner = (sl: number, sd: number, st: number): Vec3 =>
    rotateY(
      add(add(add(center, scaleVec(l, sl)), scaleVec(d, sd)), scaleVec(t, st)),
      rotation,
    );

  const camera: Vec3 = [0, 0, CAMERA_Z];
  const rotatedCenter = rotateY(center, rotation);
  const view = normalize([
    camera[0] - rotatedCenter[0],
    camera[1] - rotatedCenter[1],
    camera[2] - rotatedCenter[2],
  ]);

  const candidates: Array<{ normal: Vec3; corners: Vec3[] }> = [
    {
      normal: tangent,
      corners: [
        corner(-1, -1, 1),
        corner(1, -1, 1),
        corner(1, 1, 1),
        corner(-1, 1, 1),
      ],
    },
    {
      normal: scaleVec(tangent, -1),
      corners: [
        corner(-1, -1, -1),
        corner(-1, 1, -1),
        corner(1, 1, -1),
        corner(1, -1, -1),
      ],
    },
    {
      normal: depthAxis,
      corners: [
        corner(-1, 1, -1),
        corner(-1, 1, 1),
        corner(1, 1, 1),
        corner(1, 1, -1),
      ],
    },
    {
      normal: scaleVec(depthAxis, -1),
      corners: [
        corner(-1, -1, -1),
        corner(1, -1, -1),
        corner(1, -1, 1),
        corner(-1, -1, 1),
      ],
    },
    {
      normal: lengthAxis,
      corners: [
        corner(1, -1, -1),
        corner(1, 1, -1),
        corner(1, 1, 1),
        corner(1, -1, 1),
      ],
    },
  ];

  for (const candidate of candidates) {
    const normal = rotateY(candidate.normal, rotation);
    if (dot(normal, view) <= 0) {
      continue;
    }
    const lambert = Math.max(0, dot(normal, LIGHT));
    const facing = dot(normal, view);
    const shade = 0.79 + lambert * 0.17 + facing * 0.04;
    const projected = candidate.corners.map((point) => project(point, layout));
    faces.push({
      depth:
        projected.reduce((sum, point) => sum + point.depth, 0) /
        projected.length,
      points: projected.map((point) => [point.x, point.y]),
      shade,
    });
  }
}

export function drawSculptureFrame(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  plateCount: number,
  timeSeconds: number,
) {
  context.clearRect(0, 0, width, height);

  const layout = getSculptureLayout(width, height);
  const rotation = Math.sin(timeSeconds * 0.11) * 0.35;
  const faces: Face[] = [];

  for (let index = 0; index < plateCount; index += 1) {
    buildPlateFaces(
      index / Math.max(1, plateCount - 1),
      timeSeconds,
      layout,
      rotation,
      faces,
    );
  }

  faces.sort((a, b) => a.depth - b.depth);

  context.lineJoin = "round";
  context.lineWidth = 0.6;
  for (const face of faces) {
    const tone = Math.round(Math.min(1, face.shade) * 255);
    context.fillStyle = `rgb(${tone}, ${tone}, ${tone})`;
    context.strokeStyle = `rgba(0, 0, 0, ${0.04 + (1 - face.shade) * 0.2})`;
    context.beginPath();
    const [first, ...rest] = face.points;
    if (!first) {
      continue;
    }
    context.moveTo(first[0], first[1]);
    for (const point of rest) {
      context.lineTo(point[0], point[1]);
    }
    context.closePath();
    context.fill();
    context.stroke();
  }
}
