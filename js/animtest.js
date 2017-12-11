
var camera, scene, renderer;
var geometry, material, mesh;
var model;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    scene = new THREE.Scene();

    var loader = new THREE.JSONLoader();
    loader.load('./blenderfiles/popo.json',handle_load);
    
    function handle_load(geometry, materials){
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


function addModelToScene( geometry, materials ) {
    var material = new THREE.MeshFaceMaterial(materials);
    model = new THREE.Mesh( geometry, material );
    model.scale.set(0.5,0.5,0.5);
    scene.add( model );
}


function animate() {

    requestAnimationFrame( animate );

    mesh.rotation.x += parseInt(app.a) / 1000;
    mesh.rotation.y += parseInt(app.b) / 1000;
    mesh.rotation.z += parseInt(app.d) / 1000;

    renderer.render( scene, camera );

}
