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

var cam        = World.getCamera(),
    loader     = new OBJMTLLoader(),
    flashlight = new THREE.SpotLight(0xffffff, 5, 100),
    started    = false;

var Bed;

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

loader.load('model2/corridor.obj', 'model2/corridor.obj.mtl', function(mesh) {
  mesh.scale.set(20, 20, 20);
  mesh.position.set(0, -20, 20);
  World.add(mesh);
  var loading = document.getElementById("loading");
  loading.parentNode.removeChild(loading);
  document.getElementById("go").style.display = "block";
});

loader.load('model2/interiors/bed/Hospital_Bed.obj', 'model2/interiors/bed/Hospital_Bed.mtl', function(mesh) {
  mesh.scale.set(5, 5, 5);
  Bed = mesh;
  window.beds = [];
  for(var i=0;i<4;i++) {
    var bed = Bed.clone();
    bed.position.set(60 + i*30, -20, -65);

    World.add(bed);
    window.beds.push(bed);
  }

  for(var i=0;i<4;i++) {
    var bed = Bed.clone();
    bed.rotation.set(0, -Math.PI, 0);
    bed.position.set(60 + i*30, -20, 5);

    World.add(bed);
    window.beds.push(bed);
  }

});

World.startRenderLoop();

var KEY_UP    = 38,
    KEY_LEFT  = 37,
    KEY_RIGHT = 39,
    KEY_DOWN  = 40;

document.querySelector("button").addEventListener('click', function() {
  document.querySelector("canvas").style.display = "block";
  document.body.removeChild(document.getElementById("menu"));
  started = true;
  var bgAudio = document.getElementById("audio_bg");
  bgAudio.volume = 0.5;
  bgAudio.play();
})

window.addEventListener('keydown', function(e) {
  if(e.keyCode === KEY_UP) cam.translateZ(-1);
  else if(e.keyCode === KEY_DOWN) cam.translateZ(1);

  if(e.keyCode === KEY_LEFT) cam.rotation.y += 0.03;
  else if(e.keyCode === KEY_RIGHT) cam.rotation.y -= 0.03;
});
