
goog.require('goog.events');

ThreeDHolder.prototype.loadThumbnail = function (droppable, viewPlane) {
    
    var that = this;
	
    // set menu option to be 3d
    var that = this;
    this.currDroppable = droppable;
    this.currViewPlane = "All";
    
    that.Viewer.ViewPlaneMenu.activateIcon('All', true);
    
    
    
    
    
    var file = droppable.scanData.filePath;
    var filetype = getFileObjectType(file);
    
    // check to see if object has already been created and rendered...
    // don't want to recreate and rerender
    // keep desired functionality though -- set viewer to be dropped file
    var droppedObj = that.getObjFromList(file);
    if (droppedObj) {
        // set to be visible
        droppedObj.visible = true;
        if (filetype == 'volume' && that.currentVolObject != droppedObj) {
            toggleVolumeVisibility(droppedObj);
        }
        // make it 'selected'
        goog.dom.getElement(filetype + 'ButtonFor' + file).checked = 'checked';
        return;
    }
    
    // dropped file is new, create it and add it
	var show2D = filetype == 'volume';
	var newObj = createXObject(file);
    
    that.PlaneHolder3.Renderer.add(newObj);
    that.setOnShowtime3D(newObj, show2D);
    
    var c;
    if (filetype == 'volume') {
        c = voluContent;
        if (that.currentVolObject) {
            that.currentVolObject.visible = false;
            // deal with scrolling still
        }
        that.currentVolObject = newObj;
    }
    else if (filetype == 'mesh') c = meshContent;
    else if (filetype == 'fiber') c = fibrContent;
    
    that.currentObjects.push(newObj);
//    addFileToFolder(that, c, file, filetype);
    
    
    
    
    
    
    // Run any callbacks once everything is loaded
    utils.array.forEach(this.onloadCallbacks, function(callback) {
        callback(this.widget);
    })	
    

}


// http://jsfiddle.net/QpAcf/
