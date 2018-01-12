
var camera, scene, renderer, light, clock;
var mesh;
var character;
var isLoaded = false;
var action = {}, mixer;
var activeActionName = 'idle';
var isPlay = true;

// var arrAnimations = [
//   'idle',
//   'walk',
//   'run',
//   'hello'
// ];
// var actualAnimation = 0;

var loader = new THREE.JSONLoader();
// var textureLoader = new THREE.TextureLoader();

init();
animate();

function init() {
    clock = new THREE.Clock();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.2, 2.5);


    light = new THREE.AmbientLight(0xffffff, 1);

    scene.add(light);

    // textureLoader.load('blenderfiles/ground.png', function (texture) {
    //     var geometry = new THREE.PlaneBufferGeometry(2, 2);
    //     geometry.rotateX(-Math.PI / 2);
    //     var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    //     ground = new THREE.Mesh(geometry, material);
    //     scene.add(ground);
    // });

    loader.load('./blenderfiles/eva-animated.json', handle_load);

    function handle_load(geometry, materials){
        // mesh = new THREE.Mesh(geometry, materials);
        // scene.add(mesh);
        // mesh.position.z =-10;

        materials.forEach(function (material) {
            material.skinning = true;
        });
        character = new THREE.SkinnedMesh(
            geometry,
            new THREE.MeshFaceMaterial(materials)
        );

        mixer = new THREE.AnimationMixer(character);

        action.hello = mixer.clipAction(geometry.animations[ 0 ]);
        action.idle = mixer.clipAction(geometry.animations[ 1 ]);
        action.run = mixer.clipAction(geometry.animations[ 3 ]);
        action.walk = mixer.clipAction(geometry.animations[ 4 ]);

        action.hello.setEffectiveWeight(1);
        action.idle.setEffectiveWeight(1);
        action.run.setEffectiveWeight(1);
        action.walk.setEffectiveWeight(1);

        action.hello.setLoop(THREE.LoopOnce, 0);
        action.hello.clampWhenFinished = true;

        action.hello.enabled = true;
        action.idle.enabled = true;
        action.run.enabled = true;
        action.walk.enabled = true;

        action.walk.timeScale = -1;

        scene.add(character);

        // window.addEventListener('resize', onWindowResize, false);
        // window.addEventListener('click', onDoubleClick, false);
        // console.log('Double click to change animation');
        animate();

        isLoaded = true;

        action.idle.play();
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


function fadeAction (name) {
    var from = action[ activeActionName ].play();
    var to = action[ name ].play();

    from.enabled = true;
    to.enabled = true;

    if (to.loop === THREE.LoopOnce) {
        to.reset();
    }

    from.crossFadeTo(to, 0.3);
    activeActionName = name;
}


// function animate() {
//
//     requestAnimationFrame( animate );
//
//     // mesh.rotation.x += parseInt(app.a) / 1000;
//     // mesh.rotation.y += parseInt(app.b) / 1000;
//     // mesh.rotation.z += parseInt(app.d) / 1000;
//
//     renderer.render( scene, camera );
//
// }

function animate () {
    requestAnimationFrame(animate);
    if (!isPlay) return;
    // controls.update();
    render();

}


function render () {
    var delta = clock.getDelta();
    mixer.update(delta);
    renderer.render(scene, camera);
}
