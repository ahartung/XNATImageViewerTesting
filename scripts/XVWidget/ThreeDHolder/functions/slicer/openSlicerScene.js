
ThreeDHolder.prototype.openSlicerScene = function(file, droppable) {
    // load MRML file
    var mrml = loadXMLDoc(file);
    
    // get specific scene
    var scene;
    utils.array.forEach(mrml.getElementsByTagName('SceneView'), function(s) {
        if (s.getAttribute('name') == droppable.scanData.sceneName) scene = s;
    });
    
    
    var file = droppable.scanData.filePath.slice(0, file.lastIndexOf('/')) + '/';
    
    // access each model component (meshes!)
    this.extractFileInfo(scene, file, 'Model', 'ModelStorage');
    
    // access each volume component (volumes!)
    this.extractFileInfo(scene, file, 'Volume', 'VolumeArchetypeStorage');
//    this.extractFileInfo(scene, file, 'DiffusionTensorVolume', 'VolumeArchetypeStorage');
    
    // access each fiber component (fibers!)
    this.extractFileInfo(scene, file, 'FiberBundle', 'FiberBundleStorage');
    
    // access each annotation component
    this.addAnnotations(scene, file);
    
    // set up camera
    var pos = scene.getElementsByTagName('Camera')[0].getAttribute('position').split(' ');
    for (var i = 0; i < pos.length; ++i) {
        pos[i] = parseFloat(pos[i], 10);
    }
    this.PlaneHolder3.Renderer.camera.position = pos;
}

