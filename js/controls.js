module.exports = (function() {
  var activeKeys = {}, instance = {};

  var center = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      mouseState = { dx: 0, dy: 0 };

  instance.init = function() {
    window.addEventListener('keydown', function(e) {
      activeKeys[e.keyCode] = true;
    });

    window.addEventListener('keyup', function(e) {
      activeKeys[e.keyCode] = false;
    });
/*
    window.addEventListener('mousemove', function(e) {
      mouseState.dx = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		  mouseState.dy = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    });*/
  };

  instance.isKeyPressed = function(keyCode) {
    return activeKeys[keyCode];
  };

  instance.getMouseMovement = function() {
    return mouseState;
  }

  return instance;
})();
