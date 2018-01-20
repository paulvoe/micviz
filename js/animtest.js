
var renderer,
    scene,
    camera,
    character,
    myCanvas = document.getElementById('myCanvas');

var activeActionName;

//RENDERER
renderer = new THREE.WebGLRenderer({
    canvas: myCanvas,
    antialias: true
});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//CAMERA
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000 );

//SCENE
scene = new THREE.Scene();

//LIGHTS
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light2 = new THREE.PointLight(0xffffff, 0.4);
scene.add(light2);


var loader = new THREE.JSONLoader();
// loader.load('monkey.json', handle_load);

loader.load('blenderfiles/popo_animated.json', handle_load);

var actions = {}, mixer;

function handle_load(geometry, materials) {

    character = new THREE.SkinnedMesh(
        geometry,
        new THREE.MeshFaceMaterial(materials)
    );

    for(var x=0;x<materials.length;x++) materials[x].skinning = true;

    scene.add(character);
    character.position.z = -20;
    character.position.y = -3;


    //MIXER
    mixer = new THREE.AnimationMixer(character);

    for(var i = 0; i < geometry.animations.length; i++) {
        var name = geometry.animations[i].name;
        actions[name] = mixer.clipAction(geometry.animations[i]);
        actions[name].setLoop(THREE.LoopOnce, 0);
        actions[name].clampWhenFinished = true;
        actions[name].setEffectiveWeight(1);
    }
    console.log(actions);

    actions.wirbelsau.play();
    activeActionName = 'wirbelsau';
}


//RENDER LOOP
render();

var prevTime = Date.now();

function render() {
    // if (mesh) {
    //     mesh.rotation.y += 0.01;
    // }

    if (mixer) {
        var time = Date.now();
        mixer.update((time - prevTime) * 0.001);
        prevTime = time;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function fadeAction(name) {
    var from = actions[activeActionName].play();
    var to = actions[name].play();

    from.enabled = true;
    to.enabled = true;

    if (to.loop === THREE.LoopOnce) {
        to.reset();
    }

    from.crossFadeTo(to, 0.3);
    activeActionName = name;
}
