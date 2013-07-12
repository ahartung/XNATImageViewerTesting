
ThreeDHolder.prototype.loadThumbnail = function (droppable, viewPlane) {
	var that = this;
	
    // Amanda - problem here: checking that dropped item has frames (3D won't)
    // dummy frames? -- empty
	if (droppable.frames) { // 2D
		
        /*
		var that = this;		
		this.currDroppable = droppable;		
		this.currViewPlane = "3D";

	 	
		//---------------------------------
		// asyc Image loading
		//---------------------------------			
		this.currDroppable.loadFramesToDOM({
			
			"viewPlane" : that.currViewPlane,
			
			"before" : function (setLength) {
				
				// Exists to prevent reloading things on onload 
				that.loaded = false;

						
				//---------------------------------
				// Update progress bar
				//---------------------------------
				that.progBar.update({
					"max" : setLength,
					"clear": true
				});
				utils.fx.fadeOut(that.canvas, 0);
				that.progBar.show();	
							
			},
			
			"load" : function (img) {
			
				var mPath = that.currDroppable.pathMolder(img.src);
				//utils.dom.debug("preload")
				
				var preload = that.currDroppable.getFrames({
					'viewPlane' : that.currViewPlane,
					'filter' : 'img'
				});
				
				//utils.dom.debug(preload[0])
				var viewPlaneStr = "<b>" + that.currViewPlane.charAt(0).toUpperCase() + that.currViewPlane.slice(1) + "</b>";	
				var loadStr = "<br> Scan " + (that.currDroppable.scanData.sessionInfo["Scan"].value).toString() + " - " + viewPlaneStr + "<br>";
						
				//---------------------------------
				// Update progress bar
				//---------------------------------
				that.progBar.update({
					'label': "Loading...  " + loadStr + " " + preload.length.toString() + " / " + that.currDroppable[that.currViewPlane + "FrameCount"]
				});
				
				// this makes sure that we're putting the image back
				// with the correct scanThumbnail
				if (that.currDroppable.frames[mPath]) {

					// increments
					that.currDroppable.frames[mPath]['img'] = img;			
					that.progBar.update({"add": 1});

				}

			},
			
			"complete" : function () {
				that.loadCurrViewPlane();
			}
		})*/
	}
	else { // 3D
        
        // set menu option to be 3d
        var that = this;		
		this.currDroppable = droppable;
		this.currViewPlane = "3D";
        
        that.Viewer.ViewPlaneMenu.activateIcon('3D', true);
        
//        console.log(droppable.scanData);
        loadFileOnDrop(droppable.scanData.filePath, this.widget.id);
        
        // Run any callbacks once everything is loaded
        utils.array.forEach(this.onloadCallbacks, function(callback) {
            callback(this.widget);
        })	
        
//		throw "ThreeDHolder.js: Invalid Droppable for ThreeDHolder."
	}

}