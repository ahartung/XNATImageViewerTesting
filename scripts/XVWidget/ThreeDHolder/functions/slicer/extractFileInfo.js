ThreeDHolder.prototype.extractFileInfo = function(scene, file, item, storageNodeType) {
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