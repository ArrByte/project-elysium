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

var player = Player.init(cam);
World.add(player);
player.position.set(136.71148327948706, 0, 57.30341321947831);
player.rotation.y = 9.329999999999993;

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
  if(e.keyCode === KEY_UP) player.translateZ(-1);
  else if(e.keyCode === KEY_DOWN) player.translateZ(1);

  if(e.keyCode === KEY_LEFT) player.rotation.y += 0.03;
  else if(e.keyCode === KEY_RIGHT) player.rotation.y -= 0.03;
});
