/****************************************************************************
 * script.js
 * 
 * A Three.js particle text effect using older Three.js (r124) + FontLoader 
 * for easy global usage. 
 * 
 * The text reads "ENES\nYILMAZ" and is bigger & centered. 
 * 
 * If you get local file / CORS errors, run a local server 
 * or host on GitHub Pages.
 ****************************************************************************/

function preload() {
  const manager = new THREE.LoadingManager();

  // Once font + texture both load, create environment
  manager.onLoad = function () {
    new Environment(typo, particle);
  };

  // Load a JSON font globally with old style THREE.FontLoader
  let typo = null;
  const loader = new THREE.FontLoader(manager);

  // Using Helvetiker from threejs.org or any other .json you want
  // (Below is a typical example; you can use a custom .json if you prefer)
  loader.load(
    'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', 
    function (font) {
      typo = font;
    }
  );

  // Particle texture
  const particle = new THREE.TextureLoader(manager).load(
    'https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png'
  );
}

// Kick off preload after the DOM is ready
if (
  document.readyState === 'complete' ||
  (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  preload();
} else {
  document.addEventListener('DOMContentLoaded', preload);
}

/********************************
 *  Environment Setup
 ********************************/
class Environment {
  constructor(font, particle) {
    this.font = font;
    this.particle = particle;
    this.container = document.querySelector('#magic');
    this.scene = new THREE.Scene();

    this.createCamera();
    this.createRenderer();
    this.setup();
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  setup() {
    // Create the text-based particles
    this.createParticles = new CreateParticles(
      this.scene,
      this.font,
      this.particle,
      this.camera,
      this.renderer
    );
  }

  render() {
    this.createParticles.render();
    this.renderer.render(this.scene, this.camera);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      65,
      this.container.clientWidth / this.container.clientHeight,
      1,
      10000
    );
    // Position camera so text is visible
    this.camera.position.set(0, 0, 100);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);

    // Continuously animate
    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
  }
}

/********************************
 *  CreateParticles
 ********************************/
class CreateParticles {
  constructor(scene, font, particleImg, camera, renderer) {
    this.scene = scene;
    this.font = font;
    this.particleImg = particleImg;
    this.camera = camera;
    this.renderer = renderer;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-200, 200);
    this.colorChange = new THREE.Color();

    this.buttom = false; // tracks if mouse is down

    // Increase textSize so it's bigger & easier to see
    // 'ENES\\nYILMAZ' => two lines
    this.data = {
      text: 'ENES\nYILMAZ',
      amount: 1500,         // number of points
      particleSize: 1,
      particleColor: 0xffffff,
      textSize: 50,         // bigger letters
      area: 250,
      ease: 0.05
    };

    this.setup();
    this.bindEvents();
  }

  setup() {
    // Invisible plane for raycasting
    const geometry = new THREE.PlaneGeometry(
      this.visibleWidthAtZDepth(100, this.camera),
      this.visibleHeightAtZDepth(100, this.camera)
    );
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true
    });
    this.planeArea = new THREE.Mesh(geometry, material);
    this.planeArea.visible = false;

    this.createText();
  }

  bindEvents() {
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseDown(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
    vector.unproject(this.camera);
    const dir = vector.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / dir.z;
    this.currenPosition = this.camera.position.clone().add(dir.multiplyScalar(distance));

    this.buttom = true;
    this.data.ease = 0.01;
  }

  onMouseUp() {
    this.buttom = false;
    this.data.ease = 0.05;
  }

  onMouseMove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  render() {
    const time = ((0.001 * performance.now()) % 12) / 12;
    const zigzagTime = (1 + Math.sin(time * 2 * Math.PI)) / 6;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.planeArea);

    if (intersects.length > 0) {
      const pos = this.particles.geometry.attributes.position;
      const copy = this.geometryCopy.attributes.position;
      const coulors = this.particles.geometry.attributes.customColor;
      const size = this.particles.geometry.attributes.size;

      const mx = intersects[0].point.x;
      const my = intersects[0].point.y;

      for (let i = 0, l = pos.count; i < l; i++) {
        const initX = copy.getX(i);
        const initY = copy.getY(i);
        const initZ = copy.getZ(i);

        let px = pos.getX(i);
        let py = pos.getY(i);
        let pz = pos.getZ(i);

        // default color
        this.colorChange.setHSL(0.5, 1, 1);
        coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
        coulors.needsUpdate = true;

        size.array[i] = this.data.particleSize;
        size.needsUpdate = true;

        let dx = mx - px;
        let dy = my - py;
        const mouseDistance = this.distance(mx, my, px, py);
        const f = -this.data.area / (dx * dx + dy * dy);

        if (this.buttom) {
          // If mouse is pressed
          const t = Math.atan2(dy, dx);
          px -= f * Math.cos(t);
          py -= f * Math.sin(t);

          this.colorChange.setHSL(0.5 + zigzagTime, 1.0, 0.5);
          coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
          coulors.needsUpdate = true;

          if (
            px > initX + 70 ||
            px < initX - 70 ||
            py > initY + 70 ||
            py < initY - 70
          ) {
            this.colorChange.setHSL(0.15, 1.0, 0.5);
            coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
            coulors.needsUpdate = true;
          }
        } else {
          // Mouse not pressed
          if (mouseDistance < this.data.area) {
            if (i % 5 === 0) {
              const t = Math.atan2(dy, dx);
              px -= 0.03 * Math.cos(t);
              py -= 0.03 * Math.sin(t);

              this.colorChange.setHSL(0.15, 1.0, 0.5);
              coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
              coulors.needsUpdate = true;

              size.array[i] = this.data.particleSize / 1.2;
              size.needsUpdate = true;
            } else {
              const t = Math.atan2(dy, dx);
              px += f * Math.cos(t);
              py += f * Math.sin(t);

              pos.setXYZ(i, px, py, pz);
              pos.needsUpdate = true;

              size.array[i] = this.data.particleSize * 1.3;
              size.needsUpdate = true;
            }

            if (
              px > initX + 10 ||
              px < initX - 10 ||
              py > initY + 10 ||
              py < initY - 10
            ) {
              this.colorChange.setHSL(0.15, 1.0, 0.5);
              coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
              coulors.needsUpdate = true;

              size.array[i] = this.data.particleSize / 1.8;
              size.needsUpdate = true;
            }
          }
        }

        // Move points back to original position gradually
        px += (initX - px) * this.data.ease;
        py += (initY - py) * this.data.ease;
        pz += (initZ - pz) * this.data.ease;

        pos.setXYZ(i, px, py, pz);
        pos.needsUpdate = true;
      }
    }
  }

  createText() {
    let thePoints = [];
    let shapes = this.font.generateShapes(this.data.text, this.data.textSize);

    // If shapes have holes, push them too
    shapes.forEach(shape => {
      if (shape.holes && shape.holes.length > 0) {
        shape.holes.forEach(hole => shapes.push(hole));
      }
    });

    let geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();

    // Center horizontally (and somewhat vertically)
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    const yMid = (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 2.85;
    geometry.center();

    let colors = [];
    let sizes = [];

    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      const amountPoints = shape.type === 'Path' ? this.data.amount / 2 : this.data.amount;
      let points = shape.getSpacedPoints(amountPoints);

      points.forEach(pt => {
        let a = new THREE.Vector3(pt.x, pt.y, 0);
        thePoints.push(a);
        // default color
        colors.push(this.colorChange.r, this.colorChange.g, this.colorChange.b);
        sizes.push(1);
      });
    }

    let geoParticles = new THREE.BufferGeometry().setFromPoints(thePoints);
    geoParticles.translate(xMid, yMid, 0); // shift to center

    geoParticles.setAttribute(
      'customColor',
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geoParticles.setAttribute(
      'size',
      new THREE.Float32BufferAttribute(sizes, 1)
    );

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        pointTexture: { value: this.particleImg }
      },
      vertexShader: document.getElementById('vertexshader').textContent,
      fragmentShader: document.getElementById('fragmentshader').textContent,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });

    this.particles = new THREE.Points(geoParticles, material);
    this.scene.add(this.particles);

    // Make a copy to revert positions if needed
    this.geometryCopy = new THREE.BufferGeometry();
    this.geometryCopy.copy(this.particles.geometry);
  }

  // Calculate visible height at a specific depth
  visibleHeightAtZDepth(depth, camera) {
    const cameraOffset = camera.position.z;
    if (depth < cameraOffset) depth -= cameraOffset;
    else depth += cameraOffset;

    const vFOV = (camera.fov * Math.PI) / 180;
    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  }

  // Calculate visible width at a specific depth
  visibleWidthAtZDepth(depth, camera) {
    const height = this.visibleHeightAtZDepth(depth, camera);
    return height * camera.aspect;
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}
