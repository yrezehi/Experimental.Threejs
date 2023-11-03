(function () {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF2F2F2);

    const ambientLight = new THREE.AmbientLight(0x555555);
    ambientLight.intensity = 4;
    scene.add(ambientLight);

    var camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, .1, 500);
    camera.position.set(0, 0, 300);

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.enableRotate = false;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enabled = true;
    controls.enableDamping = true;
    controls.minPolarAngle = 0.8;
    controls.maxPolarAngle = 2.4;
    controls.dampingFactor = 0.07;
    controls.rotateSpeed = 0.07;
    controls.target.set(0, 0, 0);

    document.body.appendChild(renderer.domElement);

    document.addEventListener('mousemove', function(event) {
        console.log(controls);
        controls.handleMouseMoveRotate(event);
    }, false);

    new THREE.GLTFLoader().load('../assets/zeldas_moon.glb', function (gltf) {
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });

    function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
})();