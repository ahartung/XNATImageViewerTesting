
goog.require('goog.events');

ThreeDHolder.prototype.loadThumbnail = function (droppable, viewPlane) {
	var that = this;
	
    // set menu option to be 3d
    var that = this;
    this.currDroppable = droppable;
    this.currViewPlane = "All";
    
    that.Viewer.ViewPlaneMenu.activateIcon('All', true);
    
    if (this.currentObjects.length == 0) {
        
    }
    
//    loadFileOnDrop(droppable.scanData.filePath, this.widget.id);
    
    // Run any callbacks once everything is loaded
    utils.array.forEach(this.onloadCallbacks, function(callback) {
        callback(this.widget);
    })	
    

}