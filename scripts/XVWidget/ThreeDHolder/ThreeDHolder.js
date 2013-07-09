/**
 * ThreeDHolder is contained within the Slicer Viewer. Its siblings include the
 * View Plan Menu (and potentially the Content Divider and Scan Tabs). Its
 * children are the 4 div elements for the renderers.
 */



//******************************************************
//  Init
//
//******************************************************
goog.require(GLOBALS.classNames.XVWidget);
/**
 * @constructor
 * @extends {XVWidget}
 */
ThreeDHolder = function(args) {
	
	XVWidget.call(this, args);
	
	
	
	//----------------------------------
	//	PROGRESS BAR
	//----------------------------------
//	this.progBar = utils.gui.ProgressBar(this.widget);
//	this.progBar.hide();
	
	
	
	//----------------------------------
	//	add in elements for 3D and 2D renderers
	//----------------------------------
    /*
    this.threeDviewer = utils.dom.makeElement('div', this.widget, GLOBALS.classNames.ThreeDHolder3D, {
        position: 'absolute',
        overflow: 'hidden',
        display: 'inline',
        width: '100%',
        height: '66%',
    });
    
    this.twoDviewerX = utils.dom.makeElement('div', this.widget, GLOBALS.classNames.ThreeDHolder2D, {});
    this.twoDviewerY = utils.dom.makeElement('div', this.widget, GLOBALS.classNames.ThreeDHolder2D, {});
    this.twoDviewerZ = utils.dom.makeElement('div', this.widget, GLOBALS.classNames.ThreeDHolder2D, {});
    */
	

	
	//----------------------------------
	//	ONLOAD CALLBACKS
	//----------------------------------
	this.onloadCallbacks = [];
	this.adjustMethods = {};

	
    
//	this.updateCSS();
	

}
goog.inherits(ThreeDHolder, XVWidget);



/*
 * @type {object}
 * @protected
 */
ThreeDHolder.prototype.defaultArgs = {
	className: GLOBALS.classNames.ThreeDHolder,
	parent: document.body,
	blankMsg : "drag and drop Thumbnail here",
	contrastThreshold: .01,
	CSS: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',	
		"fontSize": 16,		
		"overflow-y": "hidden",
		"overflow-x": "hidden",
	    "font-family": 'Helvetica, Helvetica neue, Arial, sans-serif',
	    "border" : "solid",
		"borderColor": "rgba(50,50,50,1)",
		"color": "rgba(255,255,255,1)",
	  	"border-width" : 0,
	  	"border-radius": 0,	 
	  	 overflow: "visible"
  	}
}



ThreeDHolder.prototype.loadDroppable = function (droppable) {
    var that = this;
    if (droppable.frames) {
        that.loadFrames(droppable.frames);
    }
}


//******************************************************
//  Adds Callback methods once all the images (frames)
//  are loaded.
//******************************************************
ThreeDHolder.prototype.addOnloadCallback = function (callback) {
	this.onloadCallbacks.push(callback)
}






//******************************************************
//  
//******************************************************
ThreeDHolder.prototype.applyImageAdjustments = function () {
	
	for (var i in this.adjustMethods) {
		this.imageAdjust(i, this.adjustMethods[i]);	
	}
}


//******************************************************
//  Handles any pixel-related ajustment of the frame.
//  In this case, brightness and contrast.
//******************************************************
ThreeDHolder.prototype.imageAdjust = function (methodType, value) {


	//
	// Arguments are needed only when initializing the adjustMethods
	//
	if (methodType !== 'undefined' && value  && this.canvas.height > 0 && this.canvas.width > 0) {
		
		
		
		/*
		 * ! This particular variable is to account for image adjustments
		 * where both sliders are applied.
		 * Without it, only one slider's methods get applied as opposed
		 * to all of them.
		 */
		this.adjustMethods[methodType] = value;
		
		
		
		//
		// Draw original frame
		//
		this.drawFrame(this.currFrame); 

	
		//
		// Get canvas's imageData
		//
		var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);	


		//
		// Apply image adjustment methods
		//
		for (var i in this.adjustMethods) {
			switch (i) {
				case "brightness":
					imageData.data = linearBrightness(imageData.data, this.adjustMethods[i]);
					break;
				case "contrast":
					imageData.data = linearContrast(imageData.data, this.adjustMethods[i], this.defaultArgs.contrastThreshold);
					break;
			}
		}
		

		//
		// Put the new image data back into canvas
		//
		this.context.putImageData(imageData, 0, 0);	
	}
}

