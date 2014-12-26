var THREE = require('three');

module.exports = function(path, extension) {
  var directions  = ["posx", "negx", "posy", "negy", "posz", "negz"];

  var materialArray = [];
  for (var i = 0; i < 6; i++) {
    materialArray.push( new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(path + directions[i] + '.' + extension),
      side: THREE.BackSide
    }));
  }


  var skyGeo = new THREE.BoxGeometry(2200, 2200, 2200),
      skyMat = new THREE.MeshFaceMaterial(materialArray);
      sky = new THREE.Mesh(skyGeo, skyMat);

  return sky;
};
