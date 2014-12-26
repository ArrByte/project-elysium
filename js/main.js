var THREE  = require('three'),
    World  = require('three-world'),
    Level  = require('./level'),
    Player = require('./player'),
    Skybox = require('./skybox');

World.init({
  renderCallback: function() {
    //cam.translateZ(-0.1);
  },
  ambientLightColor: 0x00001a
});

window.world = World;

var cam        = World.getCamera(),
    started    = false;

World.add(Player.init(cam));
World.add(Skybox('skybox/','jpg'));
Level.init(World);

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
