/**
 * ThreeDHolder is contained within the Slicer Viewer. Its siblings include the
 * View Plan Menu (and potentially the Content Divider and Scan Tabs). Its
 * children are the 4 div elements for the renderers.
 */


//******************************************************
//  Init
//
//******************************************************
goog.provide('ThreeDHolder');

goog.require('XVWidget');
/**
 * @constructor
 * @extends {XVWidget}
 */
ThreeDHolder = function(args) {
	
	goog.base(this, utils.dom.mergeArgs(ThreeDHolder.prototype.defaultArgs, args));
	
	
	
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
        width: '50%',
        height: '50%',
        left: '50%',
        top: '50%',
    });
    /*
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
	className: GLOBALS.classNames.ThreeDHolder + ' portrait',
	parent: document.body,
	blankMsg : "drag and drop Thumbnail here",
	contrastThreshold: .01,
	CSS: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '95%',
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
	if (methodType !== 'undefined' && value) {
		
		
		
		/*
		 * ! This particular variable is to account for image adjustments
		 * where both sliders are applied.
		 * Without it, only one slider's methods get applied as opposed
		 * to all of them.
		 */
		this.adjustMethods[methodType] = value;
		
		

		//
		// Apply image adjustment methods
		//
		for (var i in this.adjustMethods) {
			switch (i) {
				case "brightness":
					console.log('adjust brightness');
					break;
				case "contrast":
					console.log('adjust contrast');
					break;
			}
		}
		

	}
}
