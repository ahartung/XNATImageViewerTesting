//******************************************************
//  
//
//******************************************************
ScanViewer.prototype.addAdjustSliders = function () {
	
	var that = /** @type {ScanViewer} */ this;
	var labelLeft = /** @type {number} */ 15;
	var sliderMarginTop = /** @type {number} */ 15;
	var sliderVerticalSpacing = /** @type {number} */ 30;
	var sliderWidth = /** @type {number} */ 100;
	var sliderLeft = /** @type {number} */ labelLeft + 65;
	var numLeft = /** @type {number} */ sliderLeft + sliderWidth + 10;

	
	/**
	 * @type {Object}
	 */
	var imgProcSliderCSS =
	{
		widgetCSS:{
			position: 'absolute',
			width: sliderWidth,
			height: 20,
			//border: "solid 1px rgb(255,255,255)"
		},
		thumbCSS:{
			height: 18,
			width: 6,
			borderRadius: 0,
			borderColor: GLOBALS.semiactiveLineColor,
			backgroundColor: "rgba(185,185,185,1)"
		},
		trackCSS: {
			width: "100%",
			height: 6,
			position: "absolute",
			top: 6,
			border: "solid 1px rgb(155,155,155)",
			borderRadius: 0
		}
	}
	
	/**
	 * @type {Object}
	 */	
	var labelCSS = {
		position: "absolute",
		color: "rgba(255, 255, 255)",
		fontSize: GLOBALS.fontSizeSmall,
		fontFamily: GLOBALS.fontFamily,
		//border: "solid 1px rgba(255,255,0,1)",
		width: sliderLeft * .75,
		height: 10
	}
	
	
	var sliderVals = ['Brightness', 'Contrast'];
	var sliderKey;
	
	utils.array.forEach(sliderVals, function(SliderName, i) { 
		/**
		 * @type {utils.gui.GenericSlider}
		 */
		sliderKey = SliderName + 'Slider';
		
		this[sliderKey] = new utils.gui.GenericSlider(utils.dom.mergeArgs(imgProcSliderCSS, {
			parent: that.ScanTabs.getTab("Adjust"),
			className: SliderName + 'Slider',
			widgetCSS:{
				top: sliderMarginTop + sliderVerticalSpacing * (i),
				left: sliderLeft,
				borderColor: 'rgb(180,180,180)'
			},
		}));
	    
	        
		// Callback
		this[sliderKey].addSlideCallback(function (_slider) {		
			var sliderVal = _slider.getValue();
			bNum.innerHTML = Math.round(sliderVal);		
			that.FrameHolder.imageAdjust(SliderName.toLowerCase(), sliderVal);
	    });  		



	
	    // Label
	    /**
	     * @type {Element}
	     */
	    var bLabel = utils.dom.makeElement("div", that.ScanTabs.getTab("Adjust"), "SliderLabel", utils.dom.mergeArgs(labelCSS, {
	    	top: sliderMarginTop + (sliderVerticalSpacing * (i)) + imgProcSliderCSS.thumbCSS.height/2 - GLOBALS.fontSizeMed/2 + 2,
	    	left: labelLeft
	    }))
	    bLabel.innerHTML = SliderName;
	    
	    
	    // Number
	    /**
	     * @type {Element}
	     */
	    var bNum = utils.dom.makeElement("div", that.ScanTabs.getTab("Adjust"), "SliderLabel", utils.dom.mergeArgs(labelCSS, {
	    	top: sliderMarginTop + (sliderVerticalSpacing * (i)) + imgProcSliderCSS.thumbCSS.height/2 - GLOBALS.fontSizeMed/2 - 2 + 3,
	    	left: numLeft ,
	    	fontSize: GLOBALS.fontSizeMed
	    }))
	    bNum.innerHTML = "0";

	})
	
}