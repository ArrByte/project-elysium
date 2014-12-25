var Q = require('q'),
    Player = (function() {

  // Internals

  var loader = new THREE.OBJMTLLoader(), mesh, self = {};

  // External interface

  self.init = function() {
    var d = Q.defer();

    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    loader.load('model3/batcave.obj', 'model3/batcave.mtl', function (object) {
      mesh = object;
      //mesh.rotation.set(0, Math.PI/2, 0);
/*
      var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

      mesh.traverse(function(child) {
        if(child instanceof THREE.Mesh) {
          child.material = material;
        }
      });
      /**/
      console.log("Loaded!");
      window.mesh = mesh;
      d.resolve(self);
    }, undefined, function(error) {
      console.error("Error loading player:", error);
      alert("Error loading player: " + error);
      d.reject(error);
    });

    return d.promise;
  }

  self.getMesh = function() { return mesh; };

  return self;
})();

module.exports = Player;
