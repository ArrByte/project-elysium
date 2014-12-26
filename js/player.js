var THREE = require('three');

var Player = (function(){
  var instance = {}, flashlight;

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

    return cam;
  }

  return instance;
})();

module.exports = Player;
