/**
 * Three.js renderer for the NOI Code Helix (approved Studio 3D prototype):
 * beveled porcelain code panels with tone-on-tone syntax inlays, joined by
 * curved ribs over two helical turns. Geometry is built once; animation is a
 * periodic whole-sculpture transform from helix-model. Lifecycle lives in
 * hero-sculpture-webgl.
 */
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  CatmullRomCurve3,
  Color,
  DirectionalLight,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  InstancedMesh,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  OrthographicCamera,
  PCFShadowMap,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  SRGBColorSpace,
  Scene,
  Shape,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

import type { HelixQuality } from "@/components/home/hero/hero.types";
import {
  HELIX_ANGLE_OFFSET,
  HELIX_HEIGHT,
  HELIX_TURNS,
  getHelixFraming,
  getHelixPanels,
  getHelixPose,
} from "@/components/home/hero/helix-model";

export type HelixRenderer = {
  setSize: (width: number, height: number, dpr: number) => void;
  render: (phase: number) => void;
  dispose: () => void;
};

const TAU = Math.PI * 2;
const PANEL_HALF_WIDTH = 0.194;
const PANEL_THICKNESS = 0.087;
const MARKS_PER_PANEL = 4;
const STROKE_PATTERNS = [
  [0.1, 0.29, 0.16, 0.21],
  [0.21, 0.12, 0.16, 0.29],
  [0.14, 0.24, 0.11, 0.24],
  [0.26, 0.13, 0.23, 0.12],
  [0.12, 0.16, 0.27, 0.15],
  [0.18, 0.22, 0.17, 0.2],
] as const;
const RIBS = [
  { offset: 0, radius: 0.45, thickness: 0.012 },
  { offset: Math.PI, radius: 0.42, thickness: 0.012 },
  { offset: 0.9, radius: 0.31, thickness: 0.008 },
] as const;

function createPanelGeometry(inner: number, outer: number) {
  const w = PANEL_HALF_WIDTH;
  const r = 0.035;
  const shape = new Shape();
  shape.moveTo(inner + r, -w);
  shape.lineTo(outer - r, -w);
  shape.quadraticCurveTo(outer, -w, outer, -w + r);
  shape.lineTo(outer, w - r);
  shape.quadraticCurveTo(outer, w, outer - r, w);
  shape.lineTo(inner + r, w);
  shape.quadraticCurveTo(inner, w, inner, w - r);
  shape.lineTo(inner, -w + r);
  shape.quadraticCurveTo(inner, -w, inner + r, -w);
  const geometry = new ExtrudeGeometry(shape, {
    depth: PANEL_THICKNESS,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelThickness: 0.014,
    bevelSize: 0.014,
    steps: 1,
    curveSegments: 3,
  });
  geometry.translate(0, 0, -PANEL_THICKNESS / 2);
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

/** Neutral softbox reflections without an HDR download. */
function createStudioEnvironment(renderer: WebGLRenderer) {
  const studio = new Scene();
  studio.background = new Color(0xe8e8e2);
  const plane = new PlaneGeometry(1, 1);
  const glow = new MeshBasicMaterial({
    color: 0xffffff,
    side: DoubleSide,
    toneMapped: false,
  });
  for (const [w, h, x, y, z, rotation] of [
    [7, 9, -6, 3, 3, -0.7],
    [4, 9, 5, 0, 1, 0.9],
    [4, 6, 0, 6, -7, 0],
  ] as const) {
    const softbox = new Mesh(plane, glow);
    softbox.scale.set(w, h, 1);
    softbox.position.set(x, y, z);
    softbox.rotation.y = rotation;
    studio.add(softbox);
  }
  const pmrem = new PMREMGenerator(renderer);
  const target = pmrem.fromScene(studio, 0.045);
  pmrem.dispose();
  plane.dispose();
  glow.dispose();
  return target;
}

function addLights(scene: Scene, quality: HelixQuality) {
  scene.add(new HemisphereLight(0xffffff, 0xc7c6bf, 1.25));
  const key = new DirectionalLight(0xffffff, 2.4);
  key.position.set(-4, 7, 8);
  key.castShadow = true;
  key.shadow.mapSize.set(quality.shadowMapSize, quality.shadowMapSize);
  Object.assign(key.shadow.camera, {
    left: -6,
    right: 6,
    top: 7,
    bottom: -7,
    near: 0.5,
    far: 30,
  });
  key.shadow.bias = -0.00016;
  key.shadow.normalBias = 0.025;
  key.shadow.radius = 3.5;
  const fill = new DirectionalLight(0xf9fafb, 0.7);
  fill.position.set(5, 0, 6);
  const rim = new DirectionalLight(0xffffff, 1.15);
  rim.position.set(1, 1, -6);
  // Concentrated bevel highlights read as porcelain rather than chrome.
  const accent = new PointLight(0xffffff, 1.8, 12, 2.1);
  accent.position.set(-3.5, 4.5, 4);
  scene.add(key, fill, rim, accent);
  return key;
}

function buildSculpture() {
  const porcelain = new MeshPhysicalMaterial({
    color: 0xfafbf8,
    roughness: 0.39,
    metalness: 0,
    clearcoat: 0.08,
    clearcoatRoughness: 0.58,
    envMapIntensity: 0.5,
  });
  const porcelainMatte = new MeshPhysicalMaterial({
    color: 0xf5f6f2,
    roughness: 0.48,
    metalness: 0,
    clearcoat: 0.05,
    clearcoatRoughness: 0.6,
    envMapIntensity: 0.38,
  });
  const inlayDark = new MeshStandardMaterial({
    color: 0xd6d9d2,
    roughness: 0.82,
    metalness: 0,
  });
  const inlayLight = new MeshStandardMaterial({
    color: 0xe8eae5,
    roughness: 0.91,
    metalness: 0,
  });
  const ribMaterial = new MeshPhysicalMaterial({
    color: 0xe7e9e3,
    roughness: 0.55,
    metalness: 0.02,
  });

  const sculpture = new Group();
  const panels = getHelixPanels();
  const markBox = new BoxGeometry(1, 1, 1);
  const capacity = panels.length * MARKS_PER_PANEL;
  const darkMarks = new InstancedMesh(markBox, inlayDark, capacity);
  const lightMarks = new InstancedMesh(markBox, inlayLight, capacity);
  let darkCount = 0;
  let lightCount = 0;
  const scratch = new Object3D();
  const local = new Vector3();

  for (const panel of panels) {
    const mesh = new Mesh(
      createPanelGeometry(panel.innerRadius, panel.outerRadius),
      panel.alternate ? porcelainMatte : porcelain,
    );
    mesh.position.y = panel.y;
    mesh.rotation.y = -panel.angle;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    sculpture.add(mesh);

    // Barely raised inlays read as source code without literal syntax colour.
    const pattern = STROKE_PATTERNS[panel.index % STROKE_PATTERNS.length] ?? [];
    const total = pattern.reduce((sum, value) => sum + value, 0);
    const usable = panel.outerRadius - panel.innerRadius - 0.25;
    const fraction = usable / (total + 0.065 * 3);
    let offset = panel.innerRadius + 0.12;
    pattern.forEach((stroke, k) => {
      const length = stroke * fraction;
      scratch.position.set(0, panel.y, 0);
      scratch.rotation.set(0, -panel.angle, 0);
      scratch.updateMatrix();
      local.set(offset + length / 2, 0.061, -0.055 + (k % 2) * 0.039);
      local.applyMatrix4(scratch.matrix);
      scratch.position.copy(local);
      scratch.scale.set(Math.max(0.03, length), 0.008, 0.021);
      scratch.updateMatrix();
      if ((panel.index + k) % 5 === 0) {
        darkMarks.setMatrixAt(darkCount++, scratch.matrix);
      } else {
        lightMarks.setMatrixAt(lightCount++, scratch.matrix);
      }
      offset += length + 0.065 * fraction;
    });
  }
  darkMarks.count = darkCount;
  lightMarks.count = lightCount;
  for (const marks of [darkMarks, lightMarks]) {
    marks.instanceMatrix.needsUpdate = true;
    marks.computeBoundingSphere();
    sculpture.add(marks);
  }

  // Curved connective ribs trace the same two turns as the panels.
  for (const rib of RIBS) {
    const points = Array.from({ length: 251 }, (_, k) => {
      const t = k / 250;
      const angle = t * TAU * HELIX_TURNS + HELIX_ANGLE_OFFSET + rib.offset;
      return new Vector3(
        rib.radius * Math.cos(angle),
        (t - 0.5) * HELIX_HEIGHT,
        rib.radius * Math.sin(angle),
      );
    });
    const mesh = new Mesh(
      new TubeGeometry(
        new CatmullRomCurve3(points),
        260,
        rib.thickness,
        6,
        false,
      ),
      ribMaterial,
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    sculpture.add(mesh);
  }

  return sculpture;
}

function disposeTree(root: Object3D) {
  const materials = new Set<{ dispose: () => void }>();
  root.traverse((object) => {
    if (object instanceof Mesh) {
      object.geometry.dispose();
      const list: unknown[] = Array.isArray(object.material)
        ? object.material
        : [object.material];
      for (const material of list) {
        if (material && typeof material === "object" && "dispose" in material) {
          materials.add(material as { dispose: () => void });
        }
      }
    }
    if (object instanceof InstancedMesh) {
      object.dispose();
    }
  });
  for (const material of materials) material.dispose();
}

/**
 * Throws when WebGL cannot be initialised (unsupported, blocklisted or
 * software-only), so the caller can fall back to the Canvas 2D sculpture.
 */
export function createHelixRenderer(
  canvas: HTMLCanvasElement,
  quality: HelixQuality,
): HelixRenderer {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
    failIfMajorPerformanceCaveat: true,
  });
  renderer.setClearAlpha(0);
  // Shader info-log checks stall on program linking and only matter in dev.
  renderer.debug.checkShaderErrors = process.env.NODE_ENV !== "production";
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.02;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  const scene = new Scene();
  const environment = createStudioEnvironment(renderer);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.44;
  const key = addLights(scene, quality);

  const sculpture = buildSculpture();
  scene.add(sculpture);

  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
  camera.position.set(0, 2.4, 15);
  camera.lookAt(0, 0, 0);

  function setSize(width: number, height: number, dpr: number) {
    const framing = getHelixFraming(width, height);
    const unit = framing.worldHeight / Math.max(1, height);
    camera.left = -framing.centerX * width * unit;
    camera.right = (1 - framing.centerX) * width * unit;
    camera.top = framing.centerY * height * unit;
    camera.bottom = -(1 - framing.centerY) * height * unit;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
  }

  function render(phase: number) {
    const pose = getHelixPose(phase);
    sculpture.rotation.set(pose.rotationX, pose.rotationY, 0.04);
    sculpture.position.y = pose.positionY;
    sculpture.scale.set(pose.scaleXZ, 1, pose.scaleXZ);
    renderer.render(scene, camera);
  }

  function dispose() {
    disposeTree(scene);
    key.shadow.dispose();
    environment.dispose();
    scene.environment = null;
    renderer.renderLists.dispose();
    renderer.dispose();
    // Release the GPU context now instead of waiting for garbage collection.
    if (!renderer.getContext().isContextLost()) renderer.forceContextLoss();
  }

  return { setSize, render, dispose };
}
