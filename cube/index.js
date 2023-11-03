(function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xD0BFFF }));
    scene.add(cube);

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    document.body.appendChild(renderer.domElement);

    (function animate() {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.025;
        cube.rotation.y += 0.025;

        renderer.render(scene, camera);
    })();

})();