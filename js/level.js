var THREE = require('three'),
    OBJMTLLoader = require('./OBJMTLLoader'),
    Q = require('q');

var loader = new OBJMTLLoader();

function loadMesh(geometryFile, materialFile, scale) {
  var d = Q.defer();

  loader.load(geometryFile, materialFile, function(mesh) {
    mesh.scale.set(scale, scale, scale);
    console.log("Resolved for", geometryFile);
    d.resolve(mesh);
  });

  return d.promise;
}

function fillOneRoom(bedMesh) {
  var room = new THREE.Object3D();
  for(var i=0;i<4;i++) {
    var bed = bedMesh.clone();
    bed.position.set(60 + i*30, -20, -65);
    room.add(bed);
  }

  for(var i=0;i<4;i++) {
    var bed = bedMesh.clone();
    bed.rotation.set(0, -Math.PI, 0);
    bed.position.set(60 + i*30, -20, 5);

    room.add(bed);
  }

  return room;
}

var initLevel = function(world) {
  Q.all([
    loadMesh('level/corridor.obj', 'level/corridor.obj.mtl', 20),
    loadMesh('interior/bed/Hospital_Bed.obj', 'interior/bed/Hospital_Bed.mtl', 5)
  ]).spread(function(level, bed) {
    // Add the level
    level.position.set(0, -20, 20);
    world.add(level);

    // Add the beds for the rooms on the right hand side
    var room = fillOneRoom(bed);
    room.position.z = 120;
    world.add(room);

    for(var i=1;i<6;i++) {
      var r = room.clone();
      r.position.z -= 120 * i;
      world.add(r);
    }

    // Add the beds for the rooms on the left hand side
    var room2 = room.clone();
    room2.position.set(-205, 0, 140);
    world.add(room2);

    for(var i=1;i<6;i++) {
      var r = room2.clone();
      r.position.z -= 120 * i;
      world.add(r);
    }


    window.room = room;

    // The game is ready!
    var loading = document.getElementById("loading");
    loading.parentNode.removeChild(loading);
    document.getElementById("go").style.display = "block";
  });
};

module.exports = {init: initLevel};
