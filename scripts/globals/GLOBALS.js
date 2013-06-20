var XV;


/*
	 * @const
	 * @type {string}
	 */

goog.provide('GLOBALS');

/**
 * @constructor
 */
GLOBALS = function (){


	/*
	 * @const
	 * @type {string}
	 */
 	this.ModalId = "XNATImageViewerModal";
	/*
	 * @const
	 * @type {string}
	 */
 	this.ScanViewerPreId = "ScanViewer";
	
	
	
	
	
	//---------------------------
	//  FONTS AND COLORS
	//---------------------------
	/*
	 * @const
	 * @type {string}
	 */
	this.inactiveFontColor = "rgba(55,55,55,1)";
	/*
	 * @const
	 * @type {string}
	 */
	this.inactiveLineColor = "rgba(55,55,55,1)"; 	
	/*
	 * @const
	 * @type {string}
	 */
	this.activeFontColor = "rgba(255,255,255,1)"; 
	/*
	 * @const
	 * @type {string}
	 */
	this.activeLineColor = "rgba(205,205,205,1)"; 		
	/*
	 * @const
	 * @type {string}
	 */
	this.semiactiveFontColor = "rgba(85,85,85,1)"; 
	/*
	 * @const
	 * @type {string}
	 */
	this.semiactiveLineColor = "rgba(85,85,85,1)"; 	
	/*
	 * @const
	 * @type {string}
	 */
	this.fontSizeSmall = 10;
	/*
	 * @const
	 * @type {string}
	 */
	this.fontSizeMed = 12;
	/*
	 * @const
	 * @type {string}
	 */
	this.fontSizeLarge = 14;
	/*
	 * @const
	 * @type {string}
	 */
	this.fontFamily = 'Helvetica, Helvetica neue, Arial, sans-serif';
	
	
	
	
	//---------------------------
	//  ANIMATION LENGTHS
	//---------------------------
	/*
	 * @const
	 * @type {string}
	 */
	this.animVeryFast = 100;
	/*
	 * @const
	 * @type {string}
	 */
	this.animFast = 200;
	/*
	 * @const
	 * @type {string}
	 */
	this.animMed = 500;
	/*
	 * @const
	 * @type {string}
	 */
	this.animSlow = 1000;
	
	
	
	
	
	//---------------------------
	//  FRAME VIEWER
	//---------------------------
	/*
	 * @const
	 * @type {string}
	 */
	this.minFrameViewerHeight = 150;
	/*
	 * @const
	 * @type {string}
	 */
	this.minFrameViewerWidth = 150;
	
	
	
	
	//---------------------------
	//  SCAN VIEWER
	//---------------------------
	/*
	 * @const
	 * @type {string}
	 */
	this.ScanViewerDimRatio = .85
	/*
	 * @const
	 * @type {string}
	 */
	this.minScanViewerHeight = 320;
	/*
	 * @const
	 * @type {string}
	 */
	this.minScanViewerWidth = this.minScanViewerHeight * this.ScanViewerDimRatio;
	/*
	 * @const
	 * @type {string}
	 */
	this.ScanViewerVerticalMargin = 20;
	/*
	 * @const
	 * @type {string}
	 */
	this.ScanViewerHorizontalMargin = 20;
	
	
	
	
	//---------------------------
	//  THUMBNAILS
	//---------------------------
	/*
	 * @const
	 * @type {string}
	 */
	this.ThumbnailImageHeight = 72;
	/*
	 * @const
	 * @type {string}
	 */
	this.ThumbnailImageWidth = 72;
	/*
	 * @const
	 * @type {string}
	 */
	this.ThumbnailImageMarginX = 8;
	/*
	 * @const
	 * @type {string}
	 */
	this.ThumbnailImageMarginY = 8;
	/*
	 * @const
	 * @type {string}
	 */
	 this.ThumbnailWidgetHeight = this.ThumbnailImageHeight + this.ThumbnailImageMarginX*2;
	/*
	 * @const
	 * @type {string}
	 */
	this.ThumbnailWidgetWidth = 200;
	
	
	
	
	//---------------------------
	//  EXPAND BUTTON
	//---------------------------
	/*
	 * @const
	 * @type {string}
	 */
	this.expandButtonWidth = 30;
	
	
	
	
	
	//---------------------------
	//  SCROLL GALLERY
	//---------------------------
	/*
	 * @const
	 * @type {string}
	 */
	this.ScrollGalleryWidth = 180;
	
	
	
	
	
	
	//---------------------------
	//  SCAN TABS
	//---------------------------
	/*
	 * @const
	 * @type {string}
	 */
	this.scanTabLabelHeight = 20;
	/*
	 * @const
	 * @type {string}
	 */
	this.scanTabLabelWidth = 40;
	/*
	 * @const
	 * @type {string}
	 */
	this.minScanTabHeight = this.scanTabLabelHeight;
	/*
	 * @const
	 * @type {string}
	 */
	this.defaultScanTabHeight = this.minScanTabHeight;	
	/*
	 * @const
	 * @type {string}
	 */
	this.maxModalWidthPct = .90;
	/*
	 * @const
	 * @type {string}
	 */
	this.maxModalHeightPct = .95;
	/*
	 * @const
	 * @type {string}
	 */
 	this.tabClickHeight = 300;
	
	
	
	
	//---------------------------
	//  SCROLL LINK GROUPS
	//---------------------------
	/*
	 * @const
	 * @type {string}
	 */
 	this.maxScrollLinkGroups = 10;
	/** @protected */ this.SliderLinker = new SliderLinker();
	
	
	
	
	//---------------------------
	//  CONTENT DIVIDER HEIGHT
	//---------------------------
	/*
	 * @const
	 * @type {string}
	 */
 	this.ContentDividerHeight = 6;
	/*
	 * @const 
	 * */ 
	this.minContentDividerTop = function (widgetHeight) {
		return widgetHeight - this.ContentDividerHeight - this.minScanTabHeight;
	} 
	
	
	
	
	//---------------------------
	//  DRAG AND DROP IMAGE
	//---------------------------
	/*
	 * @type {Image}
	 */
	this.dragAndDropImage = new Image();
	this.dragAndDropImage.src = "./icons/DragAndDrop-3pt.png";

}

GLOBALS = new GLOBALS();





