
goog.require('goog.events');

ThreeDHolder.prototype.loadThumbnail = function (droppable, viewPlane) {
    this.currDroppable = droppable;

    var m = this.Viewer.Menu;
    var file = droppable.scanData.filePath;
    var filetype = getFileObjectType(file);
    
    var droppedObj = m.getObjFromList(file);
    
    if (droppedObj) {
        this.dontReloadObj(droppedObj, file, filetype);
    } else {
        if (filetype == 'slicer') this.openSlicerScene(file, droppable);
        else this.addObject(file, filetype);
    }
    
    if (filetype == 'slicer') {
        this.currViewPlane = '3D';
        this.Viewer.ViewPlaneMenu.activateIcon('3D', true);
        handle3Dto2D(this.Viewer, '3D');
    } else if (m.currentObjects.length < 2) {
        this.currViewPlane = "All";
        this.Viewer.ViewPlaneMenu.activateIcon('All', true);
    }
    
    // Run any callbacks once everything is loaded
    utils.array.forEach(this.onloadCallbacks, function(callback) {
        callback(this.widget);
    })
    

};


ThreeDHolder.prototype.dontReloadObj = function(droppedObj, file, filetype) {
    // set to be visible
    if (filetype == 'volume' && this.Viewer.Menu.currentVolObject != droppedObj) {
//        this.Viewer.Menu.toggleVolumeVisibility(droppedObj);
        this.Viewer.Menu.currentVolObject = droppedObj;
        this.update2Drenderers(droppedObj);
        this.updateSlices();
    } else {
        droppedObj.visible = true;
    }
    // make it 'selected'
    this.Viewer.Menu.findAndSelectCheckbox(file, filetype);
};



ThreeDHolder.prototype.addObject = function(file, filetype, attributes, isSlicer) {
    var that = this;
    var m = this.Viewer.Menu;
    
    var show2D = filetype == 'volume';
    var newObj = createXObject(file);
    
    if (attributes) {
        // color -- volumes: .maxColor, meshes: .color
        var colors = attributes['color'].split(' ');
        for (var i = 0; i < colors.length; ++i) colors[i] = parseFloat(colors[i], 10);
        newObj.color = colors;
        
        if (attributes['colorTable']) {
            console.log(file + attributes['colorTable']);
            newObj.labelmap.colortable.file = file + attributes['colorTable'];
        }
        
        // opacity
        newObj.opacity = parseFloat(attributes['opacity'], 10);
        
        // visibility
        newObj.visible = attributes['visibility'] == 'true';
    }
    
    m.currentObjects.push(newObj);
    m.addFileToFolder(newObj, file, filetype);
    
    that.PlaneHolder3.widget.style.background = '#000';//(isSlicer) ? '#aae' : '#000';
    that.PlaneHolder3.Renderer.add(newObj);
    that.setOnShowtime3D(show2D, newObj);
}


ThreeDHolder.prototype.openSlicerScene = function(file, droppable) {
    var mrml = loadXMLDoc(file);
    var scene = this.getScene(mrml, droppable.scanData.sceneName);
    
    var file = droppable.scanData.filePath.slice(0, file.lastIndexOf('/')) + '/';
    
    // access each model component (meshes!)
    this.extractInfo(scene, file, 'Model', 'ModelStorage');
    
    // access each volume component (volumes!)
    this.extractInfo(scene, file, 'Volume', 'VolumeArchetypeStorage');
//    this.extractInfo(scene, file, 'DiffusionTensorVolume', 'VolumeArchetypeStorage');
    
    // access each fiber component (fibers!)
//    this.extractInfo(scene, file, 'FiberBundle', 'FiberBundleStorage');
    
    // access each annotation component
    this.addAnnotations(scene, file);
    
    // set up camera
    this.setCamera(scene, file);
}


ThreeDHolder.prototype.getScene = function(mrml, name) {
    var scene;
    
    utils.array.forEach(mrml.getElementsByTagName('SceneView'), function(s) {
        if (s.getAttribute('name') == name) scene = s;
    });
    
    return scene;
}


ThreeDHolder.prototype.extractInfo = function(scene, file, item, storageNodeType) {
    var that = this;
    
//    var selectedVolume = scene.getElementsByTagName('Selection')[0].getAttribute('activeVolumeID');
    
    utils.array.forEach(scene.getElementsByTagName(item), function(i) {
//        console.log(i.getAttribute('name'));
        
        var storageNodeRef = i.getAttribute('storageNodeRef');
        var displayNodeRef = i.getAttribute('displayNodeRef').split(' ')[0];
        var displayNodeType = displayNodeRef.split('vtkMRML')[1].split('Node')[0];
        
        if (displayNodeType == 'ScalarVolumeDisplay') displayNodeType = 'VolumeDisplay';
        if (displayNodeType.split('Fiber')[1]) displayNodeType += 'Node';
        
        var displayNode;
        var storageNode;
        
        // find corresponding item display component
        utils.array.forEach(scene.getElementsByTagName(displayNodeType), function(itemDisplay) {
            if (itemDisplay.getAttribute('id') == displayNodeRef) displayNode = itemDisplay;
        });
        
        // find corresponding item storage component
        utils.array.forEach(scene.getElementsByTagName(storageNodeType), function(itemStorage) {
            if (itemStorage.getAttribute('id') == storageNodeRef) storageNode = itemStorage;
        });
        
        // find corresponding item color table (if exists)
        var colorTableFile;
        if (displayNode.getAttribute('colorNodeID')) {
            utils.array.forEach(scene.getElementsByTagName('ColorTable'), function(ct) {
                if (ct.getAttribute('id') == displayNode.getAttribute('colorNodeID')) {
                    utils.array.forEach(scene.getElementsByTagName('ColorTableStorage'), function(cts) {
                        if (cts.getAttribute('id') == ct.getAttribute('storageNodeRef')) {
                            colorTableFile = cts.getAttribute('fileName');
                            if (colorTableFile.split('/Data/')[1])
                                colorTableFile = 'Data/' + colorTableFile.split('/Data/')[1];
                        }
                    });
                }
            });
        }
        
        var fileName = storageNode.getAttribute('fileName');
        if (fileName.split('/Data/')[1])
            fileName = 'Data/' + fileName.split('/Data/')[1];
        
        
        if (fileName.slice(-3,fileName.length) == 'vtk') fileName = fileName.slice(0,-3) + 'stl';
        
        that.addObject(file + fileName,
                       getFileObjectType(fileName),
                       { 'color': displayNode.getAttribute('color'),
                         'colorTable': colorTableFile,
                         'opacity': displayNode.getAttribute('opacity'),
                         'visibility': displayNode.getAttribute('visibility')},
                       true);
        
        /*
        console.log('   display: ');
        console.log('      color: ' + displayNode.getAttribute('color'));
        console.log('      opacity: ' + displayNode.getAttribute('opacity'));
        console.log('      visibility: ' + displayNode.getAttribute('visibility'));
        
        console.log('   filepath: ' + file+fileName);
        
        console.log('');
        */
    });
}

ThreeDHolder.prototype.addAnnotations = function(scene) {
    var that = this;
    
    utils.array.forEach(scene.getElementsByTagName('AnnotationFiducials'), function(a) {
        var displayNodeRefs = a.getAttribute('displayNodeRef').split(' ');
        var displayNodeTypes = [];
        var pointDisplay;
        
        for (var i = 0; i < displayNodeRefs.length; ++i) {
            displayNodeTypes[i] = displayNodeRefs[i].split('vtkMRML')[1].split('Node')[0];
        }
        
        // find corresponding point display node
        utils.array.forEach(scene.getElementsByTagName(displayNodeTypes[1]), function(itemDisplay) {
            if (itemDisplay.getAttribute('id') == displayNodeRefs[1]) {
                pointDisplay = itemDisplay;
            }
        });
        
        var center = a.getAttribute('ctrlPtsCoord').split(' ');
        var colors = pointDisplay.getAttribute('color').split(' ');
        for (var i = 0; i < center.length; ++i) center[i] = parseFloat(center[i], 10);
        for (var i = 0; i < colors.length; ++i) colors[i] = parseFloat(colors[i], 10);
        
        var point = new X.sphere();
        point.center = center;
        point.radius = 4;
        point.caption = a.getAttribute('name');
        point.color = colors;
        point.opacity = parseFloat(pointDisplay.getAttribute('opacity'), 10);
        point.visible = pointDisplay.getAttribute('visibility') == 'true';
        
        that.PlaneHolder3.Renderer.add(point);
        
    });
    
}


ThreeDHolder.prototype.setCamera = function(scene) {
    var pos = scene.getElementsByTagName('Camera')[0].getAttribute('position').split(' ');
    for (var i = 0; i < pos.length; ++i) {
        pos[i] = parseFloat(pos[i], 10);
    }
    this.PlaneHolder3.Renderer.camera.position = pos;
}


