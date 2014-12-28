module.exports = (function() {
  var activeKeys = {}, instance = {};

  var center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  instance.init = function() {
    window.addEventListener('keydown', function(e) {
      activeKeys[e.keyCode] = true;
    });

    window.addEventListener('keyup', function(e) {
      activeKeys[e.keyCode] = false;
    });
  };

  instance.resetKey = function(key) { activeKeys[key] = undefined; };

  instance.isKeyPressed = function(keyCode) {
    return activeKeys[keyCode];
  };

  return instance;
})();
