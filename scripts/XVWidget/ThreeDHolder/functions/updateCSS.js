//******************************************************
//  updateCSS
//
//******************************************************
ThreeDHolder.prototype.updateCSS = function (args) {

	var widgetDims = utils.dom.mergeArgs(utils.css.dims(this.widget), args);
	
	utils.css.setCSS(this.widget, widgetDims);
	
}