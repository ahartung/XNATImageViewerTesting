//******************************************************
//  Update CSS.
//
//******************************************************
XNATViewer.prototype.updateCSS = function (args) {

	
	var that = this;
	
	
    //----------------------------------
	//	RESIZE THE MODAL
	//----------------------------------
	modalDims = this.modalDims();
	$(this.modal).css(modalDims);	
	if(args) {$(this.modal).css(args);}	
	
	
	
	//----------------------------------
	//	SCROLL GALLERY
	//----------------------------------
	this.ScrollGallery.updateCSS(modalDims.ScrollGallery);


 
 	//----------------------------------
	//	SCAN VIEWERS
	//----------------------------------		
	XV.ScanViewers( function(ScanViewer, i, j) { 
				
		ScanViewer.updateCSS({
			
			height: modalDims.ScanViewer.height,// - this.args.marginTop*2,
			width: modalDims.ScanViewer.width,
			left: modalDims.ScanViewer.lefts[i][j],
			top: modalDims.ScanViewer.tops[i][j],
			
		});	
		
		if (ScanViewer.selectorBox) {
			
			__setCSS__(ScanViewer.selectorBox, {
				height: modalDims.ScanViewer.height,// - this.args.marginTop*2,
				width: modalDims.ScanViewer.width,
				left: modalDims.ScanViewer.lefts[i][j],
				top: modalDims.ScanViewer.tops[i][j],
			});				
		} 	
		
	}); 

    
	
		
	//----------------------------------
	//	CLOSE BUTTON
	//----------------------------------
	__setCSS__(this.closeButton, modalDims.closeButton);		

	
	
	
	//----------------------------------
	//	HORIZONTAL EXPAND BUTTON
	//----------------------------------

	$(this.ColumnMenu).css({
		
		top: modalDims["ColumnMenu"].top,
		left: modalDims["ColumnMenu"].left,
		height: modalDims["ColumnMenu"].height,
		width: modalDims["ColumnMenu"].width,					
			
	})
					
			
			
	
	
	
	//----------------------------------
	//	VERTICAL EXPAND BUTTONS
	//----------------------------------
	$(this.RowMenu).css({
		
		top: modalDims["RowMenu"].top,
		left: modalDims["RowMenu"].left,
		height: modalDims["RowMenu"].height,
		width: modalDims["RowMenu"].width,					
			
	})
}
