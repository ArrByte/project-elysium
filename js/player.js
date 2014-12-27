var THREE = require('three');

var Player = (function(){
  var instance = {}, flashlight, caster, player;

  var collisionVector = new THREE.Vector3(0, -1, 0);

  instance.init = function(cam, flashLightOpts) {
    if(!flashLightOpts) flashLightOpts = { color: 0xffffff, intensity: 5, distance: 100 };
    flashlight = new THREE.SpotLight(flashLightOpts.color, flashLightOpts.intensity, flashLightOpts.distance);

    flashlight.position.set(0, 0, 1);
    flashlight.target = cam;
    flashlight.castShadow = true;
    flashlight.shadowMapWidth = 1024;
    flashlight.shadowMapHeight = 1024;
    flashlight.shadowCameraNear = 500;
    flashlight.shadowCameraFar = 4000;
    flashlight.shadowCameraFov = 30;

    cam.add(flashlight);

    player = cam;
    caster = new THREE.Raycaster(player.position, collisionVector, 0, 20);

    return player;
  }

  instance.update = function(player, object) {
    //caster.set(player.position, collisionVector);
    var intersecting = caster.intersectObject(object, true);
    if(intersecting.length > 0) console.log(intersecting);
    if(intersecting.length === 0) player.position.y -= 1;
  }

  return instance;
})();

module.exports = Player;
