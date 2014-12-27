var THREE = require('three');

var Player = (function(){
  var instance = {}, casters = [], flashlight, player;

  var collisionSettings = [
    { vector: new THREE.Vector3( 0, -1,  0), yOffset:   0, distance: 20 },
    { vector: new THREE.Vector3(-1,  0,  0), yOffset: -20, distance:  5 },
    { vector: new THREE.Vector3( 1,  0,  0), yOffset: -20, distance:  5 },
    { vector: new THREE.Vector3( 0,  0, -1), yOffset: -10, distance: 5 },
    { vector: new THREE.Vector3( 0,  0,  1), yOffset: -10, distance: 5 }
  ];

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
    for(var i=0; i<collisionSettings.length; i++) {
      var setting = collisionSettings[i];
      var origin  = player.position;
      origin.y    = setting.yOffset;
      var caster = new THREE.Raycaster(origin, setting.vector, 0, setting.distance);
      casters.push(caster);
    }

    return player;
  }

  instance.update = function(player, object) {
    for(var i=0; i<casters.length; i++) {
      var intersecting = casters[i].intersectObject(object, true);
      if(intersecting.length !== 0) {
        player.position.sub(casters[i].ray.direction);
      }
    }
  }

  return instance;
})();

module.exports = Player;
