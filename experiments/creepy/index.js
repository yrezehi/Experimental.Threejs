(function () {
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0x1c1c1c);
    ambientLight.intensity = 4;
    scene.add(ambientLight);


    var camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
    camera.position.set(-900,-200,-900);

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

    const enviromentPaths = ["_front", "_back", "_up", "_down", "_right", "_left"].map(side => "../../assets/full-moon-map/bbg" + side + ".jpg");

    scene.add(new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 10000), enviromentPaths.map(image => 
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(image), side: THREE.BackSide })
    )));

    document.addEventListener('mousemove', function(event) {
        controls.handleMouseMoveRotate({ clientX: (event.clientX - (window.innerWidth * 0.5)) , clientY: event.clientY });
    }, false);

    new THREE.GLTFLoader().load('../../assets/zeldas_moon.glb', function (gltf) {
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });

    window.addEventListener('resize', function() {
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

    document.addEventListener("DOMContentLoaded", function(event) { 
        animate();
    });
})();