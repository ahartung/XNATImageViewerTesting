//******************************************************
//  Init
//******************************************************
goog.require('Viewer');
goog.provide('SlicerViewer');

/**
 * @constructor
 * @extends {Viewer}
 */
SlicerViewer = function (args) {
	Viewer.call(this, utils.dom.mergeArgs(SlicerViewer.prototype.defaultArgs, args));

	var that = this;

	//----------------------------------
	// 3D VIEWER
	//----------------------------------
	/**
	  * @type {ThreeDHolder}
	  */
	this.ThreeDHolder = new ThreeDHolder({
		parent: this.widget,
		"border-width": 0
	});
	this.ThreeDHolder.Viewer = this;
    
	/*
	 *	Modify the ThreeDHolder such that it lets "this"
	 *  know of the currentScan when it's dropped in.
	 */
	this.ThreeDHolder.addOnloadCallback(function () {
        console.log('this IS a callback - slicer');
		if(that.ThreeDHolder.currDroppable.scanData) {
            console.log('there is scan data');
			that.populateData(that.ThreeDHolder.currDroppable.scanData)
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
		tabTitles: ["Info"],
		widgetCSS: {
			height: GLOBALS.minScanTabHeight,
			width: '100%'
		}
		
	});
	this.linkContentDividerToScanTabs();
	
    
	
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
    

    this.setHoverEvents();
    this.updateCSS();
}
goog.inherits(SlicerViewer, Viewer);

/*
 * @type {object}
 * @protected
 */
SlicerViewer.prototype.defaultArgs = {
	className: GLOBALS.classNames.SlicerViewer
}


SlicerViewer.prototype.loadThumbnail = function (thumb) {
	
	SlicerViewer.superClass_.loadThumbnail.call(this, thumb);
	this.ThreeDHolder.loadThumbnail(thumb, '3D'); 
	
}



/**
 * @private
 */
SlicerViewer.prototype.setHoverEvents = function () {
	
	var that = this;
	var keeperClasses = [
		GLOBALS.classNames.ThreeDHolder
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
		var keepClasses = [ GLOBALS.classNames.ThreeDHolder ];
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
	
		//
		// Draw text on draggable ghost
		//  
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

