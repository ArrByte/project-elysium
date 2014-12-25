var World = (function() {
  // Internals

  var camera, scene, renderer, frameCallback, self = {};

  function render() {
    if(frameCallback) frameCallback();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  // Exports

  self.init = function(options) {
    if(!options) options = {};

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
    camera.position.z = options.camDistance || 100;
    frameCallback = options.renderCallback;

    // scene

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight(options.ambientLightColor || 0xffffff);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight( 0xff0000 );
		directionalLight.position.set( 0, 0, 1 ).normalize();
		scene.add( directionalLight );

    var directionalLight2 = new THREE.DirectionalLight( 0x00ff00 );
    directionalLight2.position.set( 0, 100, 0 );
    directionalLight2.rotation.set(-Math.PI/2, 0, 0);
    scene.add( directionalLight2 );

    var directionalLight3 = new THREE.DirectionalLight( 0x0000ff );
    directionalLight3.position.set( 0, 0, -1 ).normalize();
    directionalLight3.rotation.set(0, -Math.PI, 0);
    scene.add( directionalLight3 );
    window.light = directionalLight;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    var container = options.container || document.body;
    container.appendChild(renderer.domElement);
    window.scene = scene;
  }

  self.add = function(object) {
    scene.add(object);
  }

  self.getCamera = function() { return camera; };

  self.startRenderLoop = function() {
    render();
  }

  return self;
})();

module.exports = World;
