(function () {
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0xff80ff);
    light.intensity = 1;
    light.position.set(1, 1, 1);
    scene.add(light);
     
    const ambientLight = new THREE.AmbientLight( 0x80ffff );
    ambientLight.intensity = 0.2;
    scene.add(ambientLight);

    const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(300, 300, 300),
        new THREE.MeshStandardMaterial({color: 0x8080ff})
    );

    scene.add(mesh);

    (function animate() {
        requestAnimationFrame(animate);

        scene.update = function() {
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
        }

        renderer.render(scene, camera);
    })();

})();