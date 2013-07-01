//******************************************************
//  Init
//	
//******************************************************
goog.require(GLOBALS.classNames.Viewer);

goog.provide(GLOBALS.classNames.ScanViewer);
/**
 * @constructor
 * @extends {Viewer}
 */
ScanViewer = function (args) {
						
	//Viewer.call(this, utils.dom.mergeArgs(ScanViewer.prototype.defaultArgs, args));
	goog.base(this, utils.dom.mergeArgs(ScanViewer.prototype.defaultArgs, args));

	var that = this;
	

	 //----------------------------------
	 // FRAME VIEWER
	 //----------------------------------
	 /**
	  * @type {FrameViewer}
	  */
	 this.FrameViewer = new FrameViewer({
	 	parent: this.widget,
	 	"border-width": 0
	 });
	this.FrameViewer.Viewer = this;

 	
	/*
	 *	Modify the FrameViewer such that it lets "this"
	 *  know of the currentScan when it's dropped in.
	 */
	this.FrameViewer.addOnloadCallback(function () {
		if(that.FrameViewer.currDroppable.scanData) {
			that.populateData(that.FrameViewer.currDroppable.scanData)
		}
	})




	//----------------------------------
	// MENUS
	//----------------------------------	
 	this.addViewPlaneMenu();
	//this.addLinkMenu(); 	




	 //----------------------------------
	 // SLIDER
	 //----------------------------------	
	this.addFrameSlider();




	//----------------------------------
	// CONTENT DIVIDER
	//----------------------------------
	/**
	 * @type {ContentDivider}
	 */	
	this.ContentDivider = new ContentDivider( {	
		parent: this.widget,
		widgetCSS: {
			backgroundColor: "rgb(35,35,35)" 
		}
	});




	
	//----------------------------------
	// SCAN TABS
	//----------------------------------		
	/**
	 * @type {ScanTabs}
	 */	
	this.ScanTabs = new ScanTabs({

		parent: this.widget,
		tabTitles: ["Info", "Adjust"],
		widgetCSS: {
			height: GLOBALS.minScanTabHeight,
			width: '100%'
		}
		
	});
	this.linkContentDividerToScanTabs();
	


	
	//----------------------------------
	// ADJUST / IMAGE PROCESSING SLIDERS
	//----------------------------------		
	this.addAdjustSliders();


	
	//----------------------------------
	// METADATA, A.K.A. DISPLAYABLE DATA
	//----------------------------------	
	/**
	 * @type {object}
	 */
	this.displayableData = {};
	/**
	 * @type {object}
	 * @private
	 */
	this.textCSS_small = {
		color: "rgba(255,255,255,1)",
		position: "absolute",
		top: 0,
		left: 0,
		fontSize: GLOBALS.fontSizeMed,
		textAlign: "left",
		//border: "solid 1px rgb(255,255,255)",
		width: 140
	};




	/**
	 * @protected
	 */
	this.displayableData.frameNumber = utils.dom.makeElement("div", this.widget, "ScanViewerDisplayableData");
	utils.css.setCSS( this.displayableData.frameNumber, this.textCSS_small);		
		
		
		
		
	//
	// Synchronize current frame number with display
	//
	this.FrameViewer.addOnloadCallback(function () {
		that.displayableData.frameNumber.innerHTML = "Frame: "+ (that.FrameViewer.currFrame) + 
													 " / " + that.FrameViewer.frames.length;	
	});

	
	/**
	 * @type {string}
	 * @private
	 */
	this.currDroppableId = undefined;
	/**
	 * @param {string}
	 */	
	this.setDroppable = function(dId) {
		this.currDroppableId = dId;
	}
	/**
	 * @return {string}
	 */	
	this.getDroppable = function() {
		return this.currDroppableId;
	}


    
    this.setHoverEvents();

    this.updateCSS();
}
goog.inherits(ScanViewer, Viewer);






/*
 * @type {object}
 * @protected
 */
ScanViewer.prototype.defaultArgs = {
	className: GLOBALS.classNames.ScanViewer,
	sliderCSS:	
	{ 
		parent: document.body,
		className: 'FrameSlider',
		widgetCSS:{
			'height' : 8,
			'width' : '96%',
			'left' : '2%'
		},
		thumbCSS:{
			height: 7,
			width: 7,
			borderRadius: 2,
			backgroundColor: "rgba(195,195,195,1)"
		},
		trackCSS:{
			height: 3,
			backgroundColor: "rgba(55, 55, 55, 1)",
			borderRadius: 2
		}
	}
}


ScanViewer.prototype.loadThumbnail = function (thumb) {

	this.FrameViewer.loadThumbnail(thumb); 
	
}



/**
 * @private
 */
ScanViewer.prototype.setHoverEvents = function () {
	
	var that = this;
	var keeperClasses = [
		GLOBALS.classNames.FrameViewer
	]
	
	this.hoverOut = function() {
		utils.array.forEach(that.widget.childNodes, function (node) { 
			
			var found = false;
			utils.array.forEach(keeperClasses, function (keeper) { 
				if (node.className.indexOf(keeper) > -1) {
					found = true;
				}	
			});
			
			if (!found) {
				utils.fx.fadeOut(node, 0);
			}
		})		
	}
	
	this.hoverIn = function() {
		utils.array.forEach(that.widget.childNodes, function (node) { 
			utils.fx.fadeIn(node, 0);
		})
	}
	
	goog.events.listen(this.widget, goog.events.EventType.MOUSEOVER, function() { that.hoverIn() });
	goog.events.listen(this.widget, goog.events.EventType.MOUSEOUT,  function() { that.hoverOut() });

	that.hoverOut();
}


/**
 * @param {Element}
 * @protected
 */
ScanViewer.prototype.createDragElement = function(srcElt) {

	var parent, clonedElt, srcCanv, clonedCanv, context;
	var keepClasses = [
		GLOBALS.classNames.FrameViewer
	];
	var keepElts = [];
		
		
	parent = goog.dom.getAncestorByClass(srcElt, GLOBALS.classNames.ScanViewer);

	//
	// Retain any children that you want to keep
	//

	//
	// Create draggable ghost by cloning the parent
	//	
	clonedElt = parent.cloneNode(true);
	clonedElt.style.fontFamily = GLOBALS.fontFamily;
	
	srcCanv = goog.dom.getElementByClass(GLOBALS.classNames.FrameViewerCanvas, parent);
	clonedCanv = goog.dom.getElementByClass(GLOBALS.classNames.FrameViewerCanvas, clonedElt);


	
	//
	// Draw text on draggable ghost
	//
	context = clonedCanv.getContext("2d");
	context.drawImage(srcCanv, 0, 0);		  
  	//clonedElt.style.opacity = .5;	
	clonedElt.className = "CLONE";
	clonedElt.id = "CLONE";

	
	utils.css.setCSS(clonedElt, {
		cursor: 'move',
        '-moz-user-select': 'none'
	})

	
	goog.events.removeAll(clonedElt);
	return clonedElt;
}

