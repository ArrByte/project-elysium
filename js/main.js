var THREE    = require('three'),
    World    = require('three-world'),
    Level    = require('./level'),
    Player   = require('./player'),
    Skybox   = require('./skybox'),
    Controls = require('./controls');

var KEY_UP    = 38,
    KEY_LEFT  = 37,
    KEY_RIGHT = 39,
    KEY_DOWN  = 40,
    KEY_SPACE = 32;

World.init({
  renderCallback: function() {
    if(started) {
      if(Controls.isKeyPressed(KEY_UP)) player.translateZ(-1);
      else if(Controls.isKeyPressed(KEY_DOWN)) player.translateZ(1);

      if(Controls.isKeyPressed(KEY_LEFT)) player.rotation.y += 0.03;
      else if(Controls.isKeyPressed(KEY_RIGHT)) player.rotation.y -= 0.03;

      if(Controls.isKeyPressed(KEY_SPACE)) player.position.y += 2;

      player.position.y -= 1;
      Player.update(player, root);
    }
  },
  ambientLightColor: 0x00001a
});

window.world = World;

var cam     = World.getCamera(),
    started = false,
    root    = new THREE.Object3D();

var player = Player.init(cam);
World.add(player);

player.position.set(136.71148327948706, 0, 57.30341321947831);
player.rotation.y = 9.329999999999993;

Controls.init();

World.add(Skybox('skybox/','jpg'));
Level.init(World, root);

World.startRenderLoop();

document.querySelector("button").addEventListener('click', function() {
  var canvas = document.querySelector("canvas");
  canvas.style.display = "block";
  document.body.removeChild(document.getElementById("menu"));

  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    canvas.msRequestFullscreen();
  } else if (canvas.mozRequestFullScreen) {
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen();
  }

  started = true;
  var bgAudio = document.getElementById("audio_bg");
  bgAudio.volume = 0.5;
  bgAudio.play();
});
