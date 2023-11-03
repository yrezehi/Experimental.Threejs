(function () {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF2F2F2);

    const ambientLight = new THREE.AmbientLight(0x555555);
    ambientLight.intensity = 4;
    scene.add(ambientLight);

    var camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, .1, 300);
    camera.position.set(0, 0, 300);

    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    
    controls.enableZoom = true;
    controls.enabled = true;
    controls.target.set(0, 0, 0);

    document.body.appendChild(renderer.domElement);

    // base unrealated    

    new THREE.GLTFLoader().load('../assets/zeldas_moon/bin/scene.glb', function (gltf) {
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });

    function animate() {
        controls.update();
        render();
        requestAnimationFrame(animate);
    }

    function render() {
        renderer.render(scene, camera);
    }

    animate();
})();