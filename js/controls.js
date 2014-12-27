module.exports = (function() {
  var activeKeys = {}, instance = {};

  instance.init = function() {
    window.addEventListener('keydown', function(e) {
      activeKeys[e.keyCode] = true;
    });

    window.addEventListener('keyup', function(e) {
      activeKeys[e.keyCode] = false;
    });
  };

  instance.isKeyPressed = function(keyCode) {
    return activeKeys[keyCode];
  };

  return instance;
})();
