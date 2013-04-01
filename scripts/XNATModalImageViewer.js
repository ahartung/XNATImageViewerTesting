defaultArgs_XNATModalImageViewer = {
	id: "XNATModalImageViewer",
	layout: "all_columns",
	numViewers: 1,
	parent: document.body,
	minLeft: 50,
	minTop: 20,
	compressWidth: .33,
	expandWidth: .9,
	expanded: false,
	gutter: 10,
	marginWidth: 50,
	marginTop: 10,
	marginLeft: 10,
	expandButtonWidth: 30,
	galleryWidth: 100,
	MINIMUMHEIGHT: 400,
	heightPct: .90,
	_css: {
		position: "fixed",
		height: "100%",
		width: "100%",
		backgroundColor: "rgba(0,0,0,.95)",
		"overflow-x": "hidden",
		"overflow-y": "hidden",
		"display": "inline-block",
		"font-family": 'Helvetica,"Helvetica neue", Arial, sans-serif',
	},
	_modalcss: {
		position: "absolute",
		backgroundColor: "rgba(0,0,0,1)",
		border: "solid rgba(95, 95, 95, 1) 1px",
		"border-radius": "0px"
		
		// for height mins and maxes, see below
	}
}


var minModalWidth_C = function(){
	
	var minPx = 440;
	/*
	var pctCompressed = .48;
	var currPx = (pctCompressed * window.innerWidth);
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerWidth)) : (pctCompressed);
	*/
	return minPx;
}

var minModalWidth_E = function(){
	
	var minPx = 1000;
	var pctCompressed = .9;
	var currPx = (pctCompressed * window.innerWidth);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerWidth)) : (pctCompressed);
	//console.log("retVal_E: " + retVal)
	return retVal;
}

var maxModalWidth_C = function(){
	
	var minPx = 550;
	var pctCompressed = .6;
	var currPx = (pctCompressed * window.innerWidth);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerWidth)) : (pctCompressed);
	//console.log("retVal_C: " + retVal)
	return retVal;
}

var maxModalWidth_E = function(){
	
	var minPx = 1000;
	var pctCompressed = .9;
	var currPx = (pctCompressed * window.innerWidth);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerWidth)) : (pctCompressed);
	//console.log("retVal_E: " + retVal)
	return retVal;
}

var minModalHeight = function(that){
	
	var minPx = 520;
	var pctCompressed = that.args.heightPct;
	var currPx = (pctCompressed * window.innerHeight);
	
	var retVal =  (currPx < minPx) ?  ((minPx/window.innerHeight)) : (pctCompressed);
	//console.log("retVal_H: " + retVal)
	return retVal;
}

var XNATModalImageViewer = function(args){
	var that = this;
	
	__Init__(this, defaultArgs_XNATModalImageViewer, args, function(){});
		
		
		
		//----------------------------------
		//	WIDGET
		//----------------------------------			
		this.widget.onclick = function(){ 
			that.destroy();
		}	
		
		
		
		
		//----------------------------------
		//	MODAL
		//----------------------------------
		this.modal = __MakeElement__("div", this.widget, this.args.id + "_modal", this.args._modalcss);	
		$(this.modal).css({
			"overflow-x": "hidden",
			"overflow-y": "hidden"
		})
		
		// Don't destroy when clicking on window (i.e. don't propagate)				
		this.modal.onclick = function(event, element) {
			  if (event.stopPropagation) {
			      event.stopPropagation();   // W3C model
			  } else {
			      event.cancelBubble = true; // IE model
			  }
		}

		
		
		
		//----------------------------------
		//	CLOSE BUTTON
		//----------------------------------
		this.closeButton = __MakeElement__("img", this.widget, this.args.id + "_closeIcon", {
			position: "absolute", 
			cursor: "pointer",
			width: 20,
			height: 20,
			zIndex: 103
		});	
		this.closeButton.src = "./icons/closeButton.png";
		
		
		
		//----------------------------------
		//	COMPARE BUTTON
		//----------------------------------	
		this.createExpandButton();
		
		
		
		//----------------------------------
		//	SCROLL GALLERY
		//----------------------------------
		this.scrollGallery = new scrollGallery({
			parent: this.modal,
			orientation: "vertical",
			_css: {
				left: this.args.gutter,
				top: this.args.marginTop,
				height: 700,
			}
		});	
		// set the contents
		this.scrollGallery.setContents(function(){
			that.scrollGallery.thumbs = [];
			var thumbSpacing = that.scrollGallery.args.scrollMarginY;
			var totalHeight = 0;
			  	  
			for (var i=0; i<20; i++){
			 var h = i*(100) + thumbSpacing*i + that.scrollGallery.args.scrollMarginY;  	
			 var a = new scanThumbnail({
				  	id: "scrollContent_" + i.toString(),
				  	parent: that.scrollGallery.scrollContent,
				  	_css: {
				  		top: h, 
				  		left: that.scrollGallery.args.scrollMarginX,
				  	}
				  });
			   that.scrollGallery.thumbs.push(a)
			}
			  
			  that.scrollGallery.scrollContent.style.height = _px(h + that.scrollGallery.args.scrollMarginY*1 + 100);
			  that.scrollGallery.scrollContent.style.borderColor= "rgba(10, 200, 2, 1)";  
		})
		
		
		
		//----------------------------------
		//	SCAN VIEWERS
		//----------------------------------	
		this.scanViewers = [];	
		this.addScanViewer(this.args.numScanViewers);	

			
		
		this.updateCSS();
}

XNATModalImageViewer.prototype.setDropZones = function(dz){
	
	//----------------------------------
	//	SET DROPZONES
	//----------------------------------			
	for (var i=0; i < this.scrollGallery.thumbs.length; i++){
		this.scrollGallery.thumbs[i].addDropZone(dz);	
	}
}

XNATModalImageViewer.prototype.modalDims = function(conversion){
		
	var _w = minModalWidth_C();
	var _h = minModalHeight(this);
	

	var _l = (window.innerWidth * (1-_w))/2;	
	_l = (_l > this.args.minLeft) ? _l : this.args.minLeft;	
	_l = _l/window.innerWidth;

	
	var _t = (1-this.args.heightPct)/2;
	
	var pctObj =  {
		width: _w,
		left: _l,
		height: _h,
		top: _t
	}
	
	var pxObj =  {
		width: Math.round(_w * window.innerWidth),
		left: Math.round(_l * window.innerWidth),
		height: Math.round(_h * window.innerHeight),
		top: Math.round(_t * window.innerHeight),
	}
	
	
	var pctStrObj = {};
	for (key in pctObj){
		pctStrObj[key] = _pct(pctObj[key]);
	}
	
	var pxStrObj = {};
	for (key in pxObj){
		pxStrObj[key] = _px(pxObj[key]);
	}

	return{
		original: pctObj,
		pctStr: pctStrObj,
		pxStr: pxStrObj,
		px: pxObj
	}
}

XNATModalImageViewer.prototype.updateCSS = function(args){



	//----------------------------------
	//	MODAL - PASS 1
	//----------------------------------

	this.modalDimensions = this.modalDims();
	$(this.modal).css(this.modalDimensions["px"]);	
	if(args){
		$(this.modal).css(args);
	}	

	
	//----------------------------------
	//	SCROLL GALLERY
	//----------------------------------
	$(this.scrollGallery.widget).css({
		left: this.args.marginLeft,
		top: this.args.marginTop,
		height: $(this.modal).height() - this.args.marginTop*2,	
	})
	this.scrollGallery.updateCSS();




	//----------------------------------
	//	SCAN VIEWERS
	//----------------------------------		
	for (var i=0;i<this.scanViewers.length;i++){
		var l = (i==0) ? $(this.scrollGallery.widget).position().left + $(this.scrollGallery.widget).width() + this.args.marginLeft*2 : 
						 $(this.scanViewers[i-1].widget).position().left + $(this.scanViewers[i-1].widget).width() + this.args.marginLeft*2;
		$(this.scanViewers[i].widget).css({
			height: $(this.modal).height() - this.args.marginTop*2,
			left: l,
			top: this.args.marginTop,
		})
		this.scanViewers[i].updateCSS();
	}
	
	
	
	//----------------------------------
	//	MODAL - PASS 2
	//----------------------------------	
	var modalWidth = $(this.scanViewers[this.scanViewers.length-1].widget).position().left + 
					 $(this.scanViewers[this.scanViewers.length-1].widget).width() + 
					 this.args.marginLeft*2 + _i(this.expandButton.style.width);		
	$(this.modal).css({
		width: modalWidth,
		left: window.innerWidth/2 - modalWidth/2
	});

	
		
	//----------------------------------
	//	CLOSE BUTTON
	//----------------------------------
	$(this.closeButton).css({
		left: $(this.modal).position().left + modalWidth - $(this.closeButton).width()/2,
		top: this.modalDimensions["px"]["top"]- $(this.closeButton).height()/2,
		opacity: .9
	})		

	
	
	
	//----------------------------------
	//	EXPAND BUTTON
	//----------------------------------
	if (this.expandButton){
		$(this.expandButton).css({
			left:  (modalWidth - _i(this.expandButton.style.width)),
			height: "100%",
			top: 0,
		})			
	}	
	
	
}

XNATModalImageViewer.prototype.destroy = function(fadeOut){
	
	var fadeOut = (fadeOut) ? fadeOut: 200;
	
	//console.log("Destroying! " + this.args.id);
	
	var that = this;
	$(this.widget).fadeOut(fadeOut, function(){
		try{
			that.args.parent.removeChild(that.widget);			
		}
		catch(e){//do nothing
			}
	});

}



XNATModalImageViewer.prototype.addScanViewer = function(addNum){
	
	if(!addNum) addNum = 1;
	
	for (var i=0;i<addNum;i++){
		var v = new scanViewer({
			parent: this.modal,
			id: this.args.id + "_scanViewer_" + (this.scanViewers.length + i).toString(),
		});			
		this.scanViewers.push(v);	
		this.setDropZones(v.frameViewer);	
	}
}



XNATModalImageViewer.prototype.createExpandButton = function(){
	
	
	var that = this;
	
		
	//-------------------------
	// button element
	//-------------------------
	this.expandButton = __MakeElement__("button", this.modal, this.args.id + "_expandButton", {
		position: "absolute",
		"color": "rgba(255,255,255,1)",
		"font-size": 18,
		"font-weight": "bold",
		"cursor": "pointer",
		"border": "solid rgba(255, 255, 255, 0) 0px",
		"border-radius": 0,
		backgroundColor: "rgba(70, 70, 70, 1)",
		width: this.args.expandButtonWidth,
		zIndex: 100
	});
	
	
	$(this.expandButton).fadeTo(0, .7);
	
	var bindMouseLeave = function(){	
		$(this.expandButton).mouseover(function(){
		  $(this.expandButton).stop().fadeTo(200, 1);
		}).mouseleave(
			function(){ 
				if (this.changeState != "expanding"){
					$(this.expandButton).stop().fadeTo(200, .7);
				}			
	    });
	}
	
	this.expandButton.innerHTML = "+";
	bindMouseLeave();
	
	this.expandButton.onclick = function(){
		 
		 $(that.modal).stop();
		 $(that.closeButton).stop();
		 $(that.expandButton).stop().unbind('mouseleave');
		 $(that.expandButton).stop().unbind('mouseover');

		  //that.addScanViewer();
		  //that.updateCSS();
		 
		 
		 var animLen = 500;
		 var scanViewerWidth = $(that.scanViewers[that.scanViewers.length-1].widget).width();
		
		 var newWidth = $(that.modal).width() + scanViewerWidth + _i(that.closeButton.style.width);

		 $(that.modal).stop().animate({
		    width: newWidth,
		    left: window.innerWidth/2 - newWidth/2,
		  }, animLen, function() {
		    that.addScanViewer();
		    that.updateCSS({width: newWidth});
		 });

	
		 $(that.closeButton).stop().animate({
		    left: window.innerWidth/2 + newWidth/2 - (_i(that.closeButton.style.width)/2),
		  }, animLen, function() {
		    // Animation complete.
		 });
		 

		 $(that.expandButton).stop().animate({
		 	opacity: .5,
		    left: (newWidth - _i(that.expandButton.style.width)),
		  }, animLen, function() {
		    // Animation complete.
		 });
		 

 	}
}



