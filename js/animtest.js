
var camera, scene, renderer;
var geometry, material, mesh;
var model;


init();
animate();

function init() {
    // Hintergrundfarbe sollte rot sein...
    // scene = new THREE.Scene(); 
    //scene.background = new THREE.Color(0x996699, 0);
    //renderer.setClearColorHex( 0x996699, 0 );
    //renderer.setClearColor( 0x996699, 0);
    //setClearColor( 0x996699, 0);
    //scene.background = new THREE.Color( 0x996699, 0);
    
    /* versuch von Lichtern um Oberfläche kenntlicher 
    zu machen. */
    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    var light2 = new THREE.PointLight(0xffffff, 0.5);
    scene.add(light2); 
    
    
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    scene = new THREE.Scene();

    var loader = new THREE.JSONLoader();
    loader.load('./blenderfiles/boy.json',handle_load);
    
    function handle_load(geometry, materials){
        material = new THREE.MeshNormalMaterial();
        mesh = new THREE.Mesh(geometry,materials);
        scene.add(mesh);
        mesh.position.z =-10;
    }

    // var loader = new THREE.JSONLoader();
    // loader.load('./blenderfiles/marmelab.json', function(geometry) {
    //     mesh = new THREE.Mesh(geometry);
    //     scene.add(mesh);
    // });

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}


function animate() {

    requestAnimationFrame( animate );

   /* mesh.rotation.x += parseInt(app.a) / 1000;
    mesh.rotation.y += parseInt(app.b) / 1000;
    mesh.rotation.z += parseInt(app.d) / 1000; */

    renderer.render( scene, camera );

} 
