//******************************************************
//  Init
//******************************************************
goog.require(GLOBALS.classNames.Viewer);
goog.provide(GLOBALS.classNames.SlicerViewer);

/**
 * @constructor
 * @extends {Viewer}
 */
SlicerViewer = function (args) {
	goog.base(this, utils.dom.mergeArgs(SlicerViewer.prototype.defaultArgs, args));

	var that = this;

	//----------------------------------
	// FRAME VIEWER
	//----------------------------------
	/**
	  * @type {FrameHolder}
	  */
	this.FrameHolder = new FrameHolder({
		parent: this.widget,
		"border-width": 0
	});
	this.FrameHolder.Viewer = this;

 	
	/*
	 *	Modify the FrameHolder such that it lets "this"
	 *  know of the currentScan when it's dropped in.
	 */
	this.FrameHolder.addOnloadCallback(function () {
		if(that.FrameHolder.currDroppable.scanData) {
			that.populateData(that.FrameHolder.currDroppable.scanData)
		}
	})

	//----------------------------------
	// MENUS
	//----------------------------------	
 	this.addViewPlaneMenu();

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
    // Amanda - don't need this for 3D, built into xtk
//    this.addAdjustSliders();
	
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
//	this.displayableData.frameNumber = utils.dom.makeElement("div", this.widget, "ScanViewerDisplayableData");
//	utils.css.setCSS( this.displayableData.frameNumber, this.textCSS_small);		
		
	//
	// Synchronize current frame number with display
	//
	this.FrameHolder.addOnloadCallback(function () {
		that.displayableData.frameNumber.innerHTML = "Frame: "+ (that.FrameHolder.currFrame) + 
													 " / " + that.FrameHolder.frames.length;	
	});

    this.setHoverEvents();
    this.updateCSS();
}
goog.inherits(SlicerViewer, Viewer);

/*
 * @type {object}
 * @protected
 */
SlicerViewer.prototype.defaultArgs = {
	className: GLOBALS.classNames.SlicerViewer,
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


SlicerViewer.prototype.loadThumbnail = function (thumb) {
	
	SlicerViewer.superClass_.loadThumbnail.call(this, thumb);
	this.FrameHolder.loadThumbnail(thumb); 
	
}



/**
 * @private
 */
SlicerViewer.prototype.setHoverEvents = function () {
	
	var that = this;
	var keeperClasses = [
		GLOBALS.classNames.FrameHolder
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
SlicerViewer.prototype.createDragElement = function(srcElt) {
	
	var returner = SlicerViewer.superClass_.createDragElement.call(this, srcElt);
	if (returner.id !== 'DUMMY') {
	
		var parent, srcCanv, clonedCanv, context;
		var keepClasses = [ GLOBALS.classNames.FrameHolder ];
		var keepElts = [];
				
		parent = goog.dom.getAncestorByClass(srcElt, GLOBALS.classNames.SlicerViewer);
	
		//
		// Retain any children that you want to keep
		//
	
		//
		// Create draggable ghost by cloning the parent
		//	
		returner = parent.cloneNode(true);
		returner.style.fontFamily = GLOBALS.fontFamily;
		srcCanv = goog.dom.getElementByClass(GLOBALS.classNames.FrameHolderCanvas, parent);
		clonedCanv = goog.dom.getElementByClass(GLOBALS.classNames.FrameHolderCanvas, returner);
	
		//
		// Draw text on draggable ghost
		//
		context = clonedCanv.getContext("2d");
		context.drawImage(srcCanv, 0, 0);		  
	  	returner.style.opacity = .7;	
		returner.className = "VIEWERCLONE";
		returner.id = "CLONE";
	
		
		utils.css.setCSS(returner, {
			cursor: 'move',
	        '-moz-user-select': 'none'
		})
	
		
		goog.events.removeAll(returner);		
	}

	
	
	return returner;		

}

