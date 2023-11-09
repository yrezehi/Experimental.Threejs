(function () {
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0x1c1c1c);
    ambientLight.intensity = 4;
    scene.add(ambientLight);

    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
    camera.position.set(0, 0, 1000);

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
    controls.minPolarAngle = 1;
    controls.maxPolarAngle = 2.4;
    controls.dampingFactor = 0.14;
    controls.rotateSpeed = 0.14;
    controls.target.set(0, 0, 0);

    document.body.appendChild(renderer.domElement);

    const enviromentPaths = ["_front", "_back", "_left", "_down", "_up", "_right"].map(side => "../../assets/full-moon-map/bbg" + side + ".jpg");

    scene.add(new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 10000), enviromentPaths.map(image => {
        image = new THREE.TextureLoader().load(image);

        image.mapping = THREE.EquirectangularReflectionMapping;
        image.encoding = THREE.sRGBEncoding;
        image.minFilter = THREE.LinearFilter;
        image.magFilter = THREE.LinearFilter;

        return new THREE.MeshBasicMaterial({ map: image, side: THREE.BackSide })
    })));

    document.addEventListener('mousemove', function (event) {
        controls.handleMouseMoveRotate({ clientX: (event.clientX - (window.innerWidth * 0.5)), clientY: event.clientY });
    }, false);

    new THREE.GLTFLoader().load('../../assets/zeldas_moon.glb', function (gltf) {
        gltf.scene.scale.set(50, 50, 50);

        gltf.scene.position.x = 0;
        gltf.scene.position.y = 0;

        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera);
    }, false);

    function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    document.addEventListener("DOMContentLoaded", function (event) {
        animate();
    });
})();