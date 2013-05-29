var Globals= {
	
	setScanViewers: function (ScanViewers) {
		this.ScanViewers = [];
		for (var i=0; i<ScanViewers.length; i++) {
			for (var j=0; j<ScanViewers[i].length; j++) {
				this.ScanViewers.push(ScanViewers[i][j])
			}
		}

	},
	
	getScanViewers: function () { return this.ScanViewers},
}






//---------------------------
//  FONTS AND COLORS
//---------------------------
Globals.inactiveFontColor = "rgba(55,55,55,1)";
Globals.inactiveLineColor = "rgba(55,55,55,1)"; 

Globals.activeFontColor = "rgba(255,255,255,1)"; 
Globals.activeLineColor = "rgba(205,205,205,1)"; 

Globals.semiactiveFontColor = "rgba(85,85,85,1)"; 
Globals.semiactiveLineColor = "rgba(85,85,85,1)"; 

Globals.fontSizeSmall = 10;
Globals.fontFamily = 'Helvetica, Helvetica neue, Arial, sans-serif';


//---------------------------
//  ANIMATION LENGTHS
//---------------------------

Globals.animFast = 200;
Globals.animMed = 500;
Globals.animSlow = 100;



//---------------------------
//  FRAME VIEWER
//---------------------------
Globals.minFrameViewerHeight = 150;
Globals.minFrameViewerWidth = 150;

//---------------------------
//  SCAN VIEWER
//---------------------------
Globals.ScanViewerDimRatio = .85
Globals.minScanViewerHeight = 320;
Globals.minScanViewerWidth = Globals.minScanViewerHeight * Globals.ScanViewerDimRatio;
Globals.ScanViewerVerticalMargin = 20;
Globals.ScanViewerHorizontalMargin = 20;

//---------------------------
//  THUMBNAILS
//---------------------------
Globals.thumbnailHeight = 85;
Globals.thumbnailWidth = 85;

//---------------------------
//  EXPAND BUTTON
//---------------------------
Globals.expandButtonWidth = 20;

//---------------------------
//  SCROLL GALLERY
//---------------------------
Globals.ScrollGalleryWidth = 110;

//---------------------------
//  SCAN TABS
//---------------------------
Globals.scanTabLabelHeight = 20;
Globals.scanTabLabelWidth = 40;
Globals.minScanTabHeight = Globals.scanTabLabelHeight;
Globals.defaultScanTabHeight = Globals.minScanTabHeight;

Globals.maxModalWidthPct = .90;
Globals.maxModalHeightPct = .95;


Globals.tabClickHeight = 300;

//---------------------------
//  SCROLL LINK GROUPS
//---------------------------
Globals.maxScrollLinkGroups = 10;
Globals.SliderLinker = new SliderLinker();





