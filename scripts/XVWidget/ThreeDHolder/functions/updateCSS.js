//******************************************************
//  updateCSS
//
//******************************************************
ThreeDHolder.prototype.updateCSS = function (args) {

	var widgetDims = utils.dom.mergeArgs(utils.css.dims(this.widget), args);
	utils.css.setCSS(this.widget, widgetDims);
    
    if (this.PlaneHolderX) this.PlaneHolderX.updateCSS();
    if (this.PlaneHolderY) this.PlaneHolderY.updateCSS();
    if (this.PlaneHolderZ) this.PlaneHolderZ.updateCSS();
    if (this.PlaneHolder3) this.PlaneHolder3.updateCSS();
    
}