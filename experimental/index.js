(function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 ); 
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    
    document.body.appendChild(renderer.domElement);

    // base unrealated    

    new THREE.GLTFLoader().load( '../assets/zeldas_moon/scene.gltf', function ( gltf ) {
        scene.add( gltf.scene );
    }, undefined, function ( error ) {
        console.error( error );
    } );

    renderer.render( scene, camera );
})();