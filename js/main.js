var THREE = require('three'),
    World = require('three-world'),
    OBJMTLLoader = require('./OBJMTLLoader.js');

World.init({
  renderCallback: function() {
    //cam.translateZ(-0.1);
  },
  ambientLightColor: 0x000011
});

window.world = World;

var cam       = World.getCamera(),
    loader    = new OBJMTLLoader(),
    flashlight = new THREE.SpotLight(0xffffff, 5, 100);

flashlight.position.set(0, 0, 1);
flashlight.target = cam;
flashlight.castShadow = true;
flashlight.shadowMapWidth = 1024;
flashlight.shadowMapHeight = 1024;
flashlight.shadowCameraNear = 500;
flashlight.shadowCameraFar = 4000;
flashlight.shadowCameraFov = 30;


cam.add(flashlight);
World.add(cam);

var level = loader.load('model/test.obj', 'model/test.obj.mtl', function(mesh) {
  mesh.scale.set(20, 20, 20);
  mesh.position.set(0, -20, 20);
  World.add(mesh);
  var loading = document.getElementById("loading");
  loading.parentNode.removeChild(loading);
  document.getElementById("go").style.display = "block";
});

window.light = flashlight;

World.startRenderLoop();

var KEY_UP    = 38,
    KEY_LEFT  = 37,
    KEY_RIGHT = 39,
    KEY_DOWN  = 40;

document.querySelector("button").addEventListener('click', function() {
  document.querySelector("canvas").style.display = "block";
  document.body.removeChild(document.getElementById("menu"));
})

window.addEventListener('keydown', function(e) {
  console.log(e.keyCode);
  if(e.keyCode === KEY_UP) cam.translateZ(-1);
  else if(e.keyCode === KEY_DOWN) cam.translateZ(1);

  if(e.keyCode === KEY_LEFT) cam.rotation.y += 0.01;
  else if(e.keyCode === KEY_RIGHT) cam.rotation.y -= 0.01;
});
