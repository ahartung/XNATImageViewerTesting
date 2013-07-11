
//*******************************************************
//  Init
//*******************************************************

goog.require('goog.array');
goog.require(GLOBALS.classNames.Thumbnail);

goog.provide(GLOBALS.classNames.SlicerThumbnail);

/**
 * @constructor
 * @extends {Thumbnail}
 */
SlicerThumbnail = function (scanData, args) {
	
	Thumbnail.call(this, utils.dom.mergeArgs(SlicerThumbnail.prototype.defaultArgs, args));

	var that = this;
	
	//--------------------------------
	// T
	//--------------------------------
	// AJAX QUERY WOULD BE HERE
	this.scanData = scanData;	


	//--------------------------------
	// THUMBNAIL IMAGE (goes Into Canvas)
	//--------------------------------	
	/**
	* @type {Image}
	* @protected
	*/
    // Amanda - set up thumbnail image for 3D data
    // use a placeholder in the meantime
    // use Master Scene View (from mrb) ultimately
	this.ThumbnailImage.src = "./demoscans/3D/placeholder.jpg";
	
	
	
    // Amanda - xtk doesn't deal with frames, just with a single file.
    // so, got rid of frames

	this.ThumbnailCanvas.metaText = [];
	this.ThumbnailCanvas.metaText[0] = this.scanData.sessionInfo["Scan"].value;
	this.ThumbnailCanvas.metaText[1] = this.scanData.sessionInfo["type"].value.toString().toLowerCase();
    this.ThumbnailCanvas.metaText[2] = this.scanData.filePath;
	
	
	this.TextElement.innerHTML += "<b><font size = '3'>" + this.ThumbnailCanvas.metaText[0]  + "</font></b><br>";
	this.TextElement.innerHTML += this.ThumbnailCanvas.metaText[1]  + "<br>";
    this.TextElement.innerHTML += this.ThumbnailCanvas.metaText[2];

	this.addHoverMethods();

}
goog.inherits(SlicerThumbnail, Thumbnail);


/**
* @type {function(element)}
* @protected
*/
SlicerThumbnail.prototype.createDragElement = function(srcElt) {

	var parent, clonedElt, srcCanv, clonedCanv, context;

	parent = goog.dom.getAncestorByClass(srcElt, this.args.className);
	//
	// Create draggable ghost by cloning the parent
	//	
	clonedElt = parent.cloneNode(true);	


	
	//
	// Get canvases for reference
	//
	srcCanv = goog.dom.getElementByClass(GLOBALS.classNames.ThumbnailCanvas, parent);
	clonedCanv = goog.dom.getElementByClass(GLOBALS.classNames.ThumbnailCanvas, clonedElt);


	
	//
	// Draw text on draggable ghost
	//
	context = clonedCanv.getContext("2d");
	context.drawImage(srcCanv, 0, 0);		  
  	clonedElt.style.opacity = .5;	
	clonedElt.className = "CLONE";
	clonedElt.id = "CLONE";
	
	goog.events.removeAll(clonedElt);
	
	return clonedElt;
}


/**
* @type {Object}
* @protected
*/
SlicerThumbnail.prototype.defaultArgs = {
	className: GLOBALS.classNames.SlicerThumbnail
}

//*****************************************
// WINDOW RESIZING
//*****************************************
SlicerThumbnail.prototype.updateCSS = function () {

}

//*****************************************
// activated callaback
//*****************************************
/**
* @type {function(function)}
*/
SlicerThumbnail.prototype.addActivatedCallback = function (callback) {
	if(!this.activatedCallbacks)
		this.activatedCallbacks = [];
	
	this.activatedCallbacks.push(callback)
}

/**
* @type {function(string)}
* /
Thumbnail.prototype.getFrameList = function (type) {

	return (type === "sagittal") ? this.scanData.sagittalPaths : (type === "transverse") ? this.scanData.axialPaths : this.scanData.coronalPaths;
}*/
