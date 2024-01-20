(function () {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f2f2);

    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
    camera.position.set(0, 0, 200);

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

    document.addEventListener('mousemove', function (event) {
        controls.handleMouseMoveRotate({ clientX: (event.clientX - (window.innerWidth * 0.5)), clientY: event.clientY });
    }, false);

    var animationMixer = null;

    new THREE.GLTFLoader().load('../../assets/shadeless_godzilla.glb', function (gltf) {
        gltf.scene.scale.set(50, 50, 50);

        gltf.scene.position.x = 0;
        gltf.scene.position.y = -50;

        animationMixer = new THREE.AnimationMixer(gltf.scene)
        animationMixer.clipAction(gltf.animations[0]).play()

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

    const threeClock = new THREE.Clock()

    function animate() {
        controls.update();
        renderer.render(scene, camera);

        if(animationMixer != null)
            animationMixer.update(threeClock.getDelta())

        requestAnimationFrame(animate);
    }

    document.addEventListener("DOMContentLoaded", function (event) {
        animate();
    });
})();