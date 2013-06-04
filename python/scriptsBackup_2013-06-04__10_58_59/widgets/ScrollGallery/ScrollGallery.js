//******************************************************
//  Init
//
//******************************************************
var ScrollGallery = function (args) {
  	
  	var that = this;
	this.args = (args) ? utils.dom.mergeArgs(this.defaultArgs(), args) : this.defaultArgs();
	this.widget = utils.dom.makeElement("div", this.args.parent, this.args.id, this.widgetCSS);
	
	
	//-------------------------------
	// resize
	//-------------------------------	
	$(window).resize(function () { that.updateCSS();});


	//-------------------------------
	// WIDGET
	//-------------------------------	 
	 utils.css.setCSS(this.widget, utils.dom.mergeArgs(this.args.widgetCSS, args.widgetCSS));


	//-------------------------------
	// SCROLL CONTENT
	//-------------------------------
	var sliderWidth = this.args.sliderCSS.trackCSS.width;
	this.ScrollContent = utils.dom.makeElement("div", this.widget, "ScrollContent", {
		position: "relative",
		//backgroundColor: "rgba(0,0,255,.5)",
		top: 0,
		left: sliderWidth,
		width: $(this.widget).width() - sliderWidth,
	})




	//-------------------------------
	// THE SLIDER
	//-------------------------------	
	this.contentSlider = new utils.gui.verticalSlider(utils.dom.mergeArgs(this.args.sliderCSS,{
		parent: this.widget,
		id: "VerticalSlider",
		round: true,
	}));
  
  
  
  
	//-------------------------------
	// THE CONTENTS - BLANK FOR NOW
	//-------------------------------
	var blankContents = utils.dom.makeElement("div", document.body, "blankElement", {
		height: 800, 
		width: 100, 
		backgroundColor: "rgba(200,100,51,.5)"
	});
	blankContents.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."	    
	this.setContents(blankContents)
  
	
	this.updateCSS();
}




ScrollGallery.prototype.defaultArgs = function () {
	
	return {
		id: "ScrollGallery",
		parent: document.body,
		orientation: "vertical",
		sliderLocation: "left",
		sliderWidth: 8,
		scrollMarginY: 8,
		scrollMarginX: 8,
		widgetCSS: {
			top: 0,
			left: 30,
			width: GLOBALS.ScrollGalleryWidth,
			height: 400,
			position: "absolute",
		 	overflow: "hidden",
		 	"overflow-x": "hidden",
		 	"overflow-y": "hidden",
		 	//backgroundColor: "rgba(200,20,20,1)",
		 	//border: "solid 1px rgba(255,0,0,1)"
		},
		
		sliderCSS:	
		{
			id: "FrameSlider", 
			parent: document.body,
			round: true,
			handleOffsetLeft: 0,
		  	handleOffsetTop: 0,
			widgetCSS:{
			},
			handleCSS:{
				height: GLOBALS.ThumbnailWidgetHeight,
				width: 7,
				borderWidth: 0,
				borderColor: GLOBALS.semiactiveLineColor,
				backgroundColor: "rgba(105,105,105,1)"
			},
			trackCSS:{
				borderWidth: 0,
				width: 7,
				borderColor: GLOBALS.semiactiveLineColor,
				backgroundColor: "rgba(0, 0, 0, 1)"
			}
		}		
	}
}




//******************************************************
//  Need to map the min/max and step values of the slider
//  to the length of the contents so we can scroll
//  in a proportional manner. This varies depending on 
//  the orientation of the gallery: vertical or horizontal.
//******************************************************
ScrollGallery.prototype.mapSliderToContents = function () {
	var that = this;
	return function (_slider) {		
		
		if (that.args.orientation == "vertical") {
	  		var t = -1 * utils.convert.remap1D(_slider.value, [_slider.currArgs().min, _slider.currArgs().max], 
	   							    [0, $(that.ScrollContent).outerHeight() - $(that.widget).height() - that.args.scrollMarginY]).newVal;	
	   		$(that.ScrollContent).css({
	  			top: t,
	  		});
		}
   }
}




//******************************************************
//  Sets contents.
//******************************************************
ScrollGallery.prototype.setContents = function (thing) {
  
	var that = this;

  
	//-------------------------------
	// REMOVE PREXISTING CHILD ELEMENTS
	//-------------------------------  
	while (this.ScrollContent.hasChildNodes()) {
	    this.ScrollContent.removeChild(this.ScrollContent.lastChild);
	}
	

	//-------------------------------
	// IF thing IS A FUNCTION
	//-------------------------------  
	if (typeof thing === "function") {
		thing();
	}
	//-------------------------------
	// IF thing IS AN OBJECT - (used now for blank contents)
	//-------------------------------  
	else if (typeof thing === "object") {
		// if obj is a DOM Element
		if(thing.tagName) {
			that.ScrollContent.appendChild(thing);
			that.ScrollContent.style.height = utils.convert.px($(thing).height());
		}
	}

	that.contentSlider.addSlideCallback(that.mapSliderToContents());  
	that.contentSlider.bindToMouseWheel(that.widget);		
	this.updateCSS();
}




//******************************************************
//  UpdateCSS
//******************************************************
ScrollGallery.prototype.updateCSS = function (args) {


    if (args) { utils.css.setCSS(this.widget, args.widgetCSS) };
    
	//----------------------------------
	// CSS: FRAME SLIDER
	//----------------------------------
    this.contentSlider.updateCSS({
    	widgetCSS:{
 			top : 0,
			left : 0,   		
    	},
    	trackCSS:{
    		height: $(this.widget).height(),
    	}
    })
}
