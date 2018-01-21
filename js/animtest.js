
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
 camera.position.set(0, 1.2, 2.5);
//SCENE
scene = new THREE.Scene();

//LIGHTS
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light2 = new THREE.PointLight(0xffffff, 0.4);
scene.add(light2);


var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0.6, 0);


var loader = new THREE.JSONLoader();
// loader.load('monkey.json', handle_load);

loader.load('blenderfiles/V4.json', handle_load);

var actions = {}, mixer;

function handle_load(geometry, materials) {

    character = new THREE.SkinnedMesh(
        geometry,
        new THREE.MeshFaceMaterial(materials)
    );

    for(var x=0;x<materials.length;x++) materials[x].skinning = true;

    scene.add(character);
    // character.position.z = -20;
    // character.position.y = -3;


    //MIXER
    mixer = new THREE.AnimationMixer(character);

    for(var i = 0; i < geometry.animations.length; i++) {
        var name = geometry.animations[i].name;
        actions[name] = mixer.clipAction(geometry.animations[i]);
        actions[name].setLoop(THREE.LoopOnce);
        actions[name].clampWhenFinished = false;
        actions[name].setEffectiveWeight(1);
    }
    activeActionName = 'wunder';
    actions[activeActionName].play();
    console.log(actions);
}


//RENDER LOOP
render();

var prevTime = Date.now();

function render() {
    requestAnimationFrame(render);
    controls.update();

    if (mixer) {
        var time = Date.now();
        mixer.update((time - prevTime) * 0.001);
        prevTime = time;
    }


    renderer.render(scene, camera);
}

function fadeAction(name) {
    var newAction = actions[name];
    var activeAction = actions[activeActionName];
    if(!activeAction.isRunning()) {
        activeActionName = name;
        newAction.reset();
        newAction.play();
    }
}

	//		add star sphere							//
	//////////////////////////////////////////////////////////////////////////////////
	
    var geometry  = new THREE.SphereGeometry(90, 32, 32)
	var url   = 'bower_components/threex.planets/examples/images/galaxy_starfield.png'
	var material  = new THREE.MeshBasicMaterial({
		map : THREE.ImageUtils.loadTexture(url),
		side  : THREE.BackSide
	})
	var starSphere  = new THREE.Mesh(geometry, material)
	scene.add(starSphere)
