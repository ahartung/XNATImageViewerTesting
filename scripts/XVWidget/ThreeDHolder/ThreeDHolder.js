/**
 * ThreeDHolder is contained within the Slicer Viewer. Its siblings include the
 * View Plan Menu, Content Divider, and Scan Tabs. Its children are 4 Plane Holders
 * which hold the renderers.
 */


//******************************************************
//  Init
//******************************************************
goog.provide('ThreeDHolder');

goog.require('XVWidget');
/**
 * @constructor
 * @extends {XVWidget}
 */
ThreeDHolder = function(args) {
	
	goog.base(this, utils.dom.mergeArgs(ThreeDHolder.prototype.defaultArgs, args));
	
    // viewer-specific properties
    this.firstVolumeObject = true;
    this.currentVolOject;
    this.currentObjects = [];
    
    
	//----------------------------------
	//	PROGRESS BAR
	//----------------------------------
//	this.progBar = utils.gui.ProgressBar(this.widget);
//	this.progBar.hide();
	
    
    //----------------------------------
    // VIEW PANES FOR RENDERERS
    //----------------------------------
    this.addViewPanes();
    
	
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

	// Arguments are needed only when initializing the adjustMethods
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


ThreeDHolder.prototype.addViewPanes = function () {
    this.PlaneHolderX = new PlaneHolder('x', {
		parent: this.widget,
        CSS: {
            left: '0%',
            top: '0%',
        }
	});
    
    this.PlaneHolderY = new PlaneHolder('y', {
		parent: this.widget,
        CSS: {
            left: '50%',
            top: '0%',
        }
	});
    
    this.PlaneHolderZ = new PlaneHolder('z', {
		parent: this.widget,
        CSS: {
            left: '0%',
            top: '50%',
        }
	});
    
    this.PlaneHolder3 = new PlaneHolder('v', {
		parent: this.widget,
        CSS: {
            left: '50%',
            top: '50%',
        }
	});
}


/**
 * Returns the already-created X object that matches the provided file.
 * @param {String} f Filename / filepath
 * @return {Object | undefined}
 */
ThreeDHolder.prototype.getObjFromList = function(f) {
    for (var i = 0; i < this.currentObjects.length; ++i) {
        if (this.currentObjects[i].file == f) return this.currentObjects[i];
    }
}


/**
 * Sets the .onShowtime() method of the 3D renderer. If we want to show the 2D
 * renderers, they are prepped and rendered, and the sliders are initialized.
 * @param {Object} object X object to be displayed
 * @param {boolean} show2D True if we want to show 2D renderers
 * @return {undefined}
 */
ThreeDHolder.prototype.setOnShowtime3D = function (object, show2D) {
    var that = this;
    if (show2D) {
        that.PlaneHolder3.Renderer.onShowtime = function() {
            if (that.firstVolObj) {
                setupVolumeOptions();
                initSliceSliders(that);
                that.firstVolObj = false;
            }
            that.update2Drenderers(object);
//            initVolOpacitySlider();
//            initThreshSlider();
            
        };
    } else {
        that.PlaneHolder3.Renderer.onShowtime = function() { };
    }
}


/**
 * Adds the provided object to each of the 2D renderers and renders. Calls
 * the slice slider init function to re-init sliders and index boxes for new object.
 * @param {Object} X object to be added
 * @return {undefined}
 */
ThreeDHolder.prototype.update2Drenderers = function(object) {
    this.PlaneHolderX.Renderer.add(object);
    this.PlaneHolderX.Renderer.render();
    
    this.PlaneHolderY.Renderer.add(object);
    this.PlaneHolderY.Renderer.render();
    
    this.PlaneHolderZ.Renderer.add(object);
    this.PlaneHolderZ.Renderer.render();
    
//    updateSlices(this);
}


/**
 * Destroys all 4 renderers. Called when a 2D file is dropped into a viewport
 * currently displaying 3D images.
 * @param {undefined}
 * @return {undefined}
 */
ThreeDHolder.prototype.destroyRenderers = function() {
    this.PlaneHolderX.Renderer.destroy();
    this.PlaneHolderY.Renderer.destroy();
    this.PlaneHolderZ.Renderer.destroy();
    this.PlaneHolder3.Renderer.destroy();
}

