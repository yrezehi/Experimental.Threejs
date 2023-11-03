(function () {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xF2F2F2 );

    var camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, .1, 10000 );
    camera.position.set(0, 0, 300);

    const renderer = new THREE.WebGLRenderer();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;

    document.body.appendChild(renderer.domElement);

    // base unrealated    

    new THREE.GLTFLoader().load( '../assets/zeldas_moon/bin/scene.glb', function ( gltf ) {
        scene.add( gltf.scene );
    }, undefined, function ( error ) {
        console.error( error );
    } );

    function animate() {
        render();
        requestAnimationFrame( animate );
    }
    
    function render() {
        renderer.render( scene, camera );
    }

    animate();
})();