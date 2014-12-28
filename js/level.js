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

var initLevel = function(world, root) {
  Q.all([
    loadMesh('level/corridor.obj', 'level/corridor.obj.mtl', 20),
    loadMesh('interior/bed/Hospital_Bed.obj', 'interior/bed/Hospital_Bed.mtl', 5),
    loadMesh('interior/Leather_Sofa/Leather_Sofa.obj', 'interior/Leather_Sofa/Leather_Sofa.mtl', 5),
    loadMesh('interior/MedicalCabinet/MedicalCabinet.obj', 'interior/MedicalCabinet/MedicalCabinet.mtl', 0.15),
    loadMesh('interior/lab-bed/lab-bed.obj', 'interior/lab-bed/lab-bed.mtl', 0.15)
  ]).spread(function(level, bed, sofa, cabinet, labBed) {
    // Add the level
    level.position.set(0, -20, 20);
    root.add(level);

    // Add the beds for the rooms on the right hand side
    var room = fillOneRoom(bed);
    room.position.z = 120;
    root.add(room);

    for(var i=1;i<6;i++) {
      var r = room.clone();
      r.position.z -= 120 * i;
      root.add(r);
    }

    // Add the beds for the rooms on the left hand side
    var room2 = room.clone();
    room2.position.set(-205, 0, 140);
    root.add(room2);

    for(var i=1;i<6;i++) {
      var r = room2.clone();
      r.position.z -= 120 * i;
      root.add(r);
    }

    // Sofas in the waiting room
    sofa.position.set(-200, -20, -445);
    sofa.rotation.y = -Math.PI;
    root.add(sofa);
    for(var i=1;i<3;i++) {
      var s = sofa.clone();
      s.position.x -= 35 * i;
      root.add(s);
    }

    cabinet.position.set(-156, -20, -10);
    cabinet.rotation.y = -Math.PI/2;
    cabinet.actionable = true;
    root.add(cabinet);

    labBed.position.set(-265, -73.2, -650);
    labBed.rotation.y = 2.6;
    root.add(labBed);

    world.add(root);

    // Adding some splatter :D
    var splat = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 0.1), new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture('level/splat1.png'),
      transparent: true
    }));
    splat.position.set(-179.955, 0, -470);
    splat.rotation.y = -Math.PI / 2;
    splat.scale.set(4, 4, 1);
    world.add(splat);

    // The game is ready!
    var loading = document.getElementById("loading");
    loading.parentNode.removeChild(loading);
    document.getElementById("go").style.display = "block";
  });
};

module.exports = {init: initLevel};
