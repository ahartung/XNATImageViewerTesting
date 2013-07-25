
goog.require('goog.ui.Component');
goog.require('goog.ui.Slider');

/**
 * Set properties and starting values of x/y/zSliders and x/y/zIndexBoxes.
 * Only called once *volume* has loaded.
 * @param {Object} obj X object sliders will control
 * @return {undefined}
 */
ThreeDHolder.prototype.initSliceSliders = function() {
    //----------------------------------
    // CREATE SLIDERS
    //----------------------------------
    this.xSlider = new goog.ui.Slider;
    this.ySlider = new goog.ui.Slider;
    this.zSlider = new goog.ui.Slider;
    
    this.xSlider.decorate(goog.dom.getElementByClass('xSlice', this.widget));
    this.ySlider.decorate(goog.dom.getElementByClass('ySlice', this.widget));
    this.zSlider.decorate(goog.dom.getElementByClass('zSlice', this.widget));
    
    
    
    //----------------------------------
    // CREATE FRAME INDEX LABELS
    //----------------------------------
    this.xBox = goog.dom.getElementByClass('xBox', this.widget);
    this.yBox = goog.dom.getElementByClass('yBox', this.widget);
    this.zBox = goog.dom.getElementByClass('zBox', this.widget);
    
    
    
    //----------------------------------
    // UPDATE SLIDERS
    //----------------------------------
    this.updateSlices();
    
    
    
    //----------------------------------
    // ADD SLIDER LISTENERS
    //----------------------------------
    var that = this;
    var cvo = this.currentVolObject;

    goog.events.listen(that.xSlider, goog.ui.Component.EventType.CHANGE, function() {
        cvo.indexX = that.xSlider.getValue();
        that.xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
        cvo.modified();
    });
    
    goog.events.listen(that.ySlider, goog.ui.Component.EventType.CHANGE, function() {
        cvo.indexY = that.ySlider.getValue();
        that.yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
        cvo.modified();
    });
    
    goog.events.listen(that.zSlider, goog.ui.Component.EventType.CHANGE, function() {
        cvo.indexZ = that.zSlider.getValue();
        that.zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
        cvo.modified();
    });
    
    
    
    //----------------------------------
    // ADD SCROLL LISTENERS
    //----------------------------------
    this.addScrollListeners();
    
    
    
    
    //----------------------------------
    // ADD SHIFT/MOVE LISTENERS
    //----------------------------------
    this.addShiftMoveListeners();
    
    
    
//    addIndexBoxListeners(viewer);
};


ThreeDHolder.prototype.updateSlices = function() {
    var cvo = this.currentVolObject;
    
//    console.log('x: ' + this.xSlider.getValue() + ' to ' + cvo.indexX);
    
    utils.array.forEach(this.currentObjects, function(o) {
        console.log(o._id + ': \t' + o.indexX + ' ' + o.indexY + ' ' + o.indexZ);
    });
    console.log(cvo._id);
    
    cvo.indexX = Math.round(cvo.indexX);
    cvo.indexY = Math.round(cvo.indexY);
    cvo.indexZ = Math.round(cvo.indexZ);
    
    this.xSlider.setMaximum(cvo.dimensions[2]-1);
    this.ySlider.setMaximum(cvo.dimensions[1]-1);
    this.zSlider.setMaximum(cvo.dimensions[0]-1);
    
    this.xSlider.setValue(cvo.indexX);
    this.ySlider.setValue(cvo.indexY);
    this.zSlider.setValue(cvo.indexZ);
    
    this.xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
    this.yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
    this.zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
    
};


ThreeDHolder.prototype.addScrollListeners = function() {
    var that = this;
    
    that.PlaneHolderX.Renderer.onScroll = function() {
        var cvo = that.currentVolObject;    // this MUST be inside the function!
        that.xSlider.setValue(cvo.indexX);
        that.xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
        
    };
    that.PlaneHolderY.Renderer.onScroll = function() {
        var cvo = that.currentVolObject;
        that.ySlider.setValue(cvo.indexY);
        that.yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
    };
    that.PlaneHolderZ.Renderer.onScroll = function() {
        var cvo = that.currentVolObject;
        that.zSlider.setValue(cvo.indexZ);
        that.zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
    };
};



ThreeDHolder.prototype.addShiftMoveListeners = function() {
    var that = this;
    
    that.PlaneHolderX.Renderer.xy2ijkOverwrite = function() {
        var cvo = that.currentVolObject;    // this MUST be inside the function!
        that.ySlider.setValue(cvo.indexY);
        that.yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
        that.zSlider.setValue(cvo.indexZ);
        that.zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
    };
    that.PlaneHolderY.Renderer.xy2ijkOverwrite = function() {
        var cvo = that.currentVolObject;
        that.xSlider.setValue(cvo.indexX);
        that.xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
        that.zSlider.setValue(cvo.indexZ);
        that.zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
    };
    that.PlaneHolderZ.Renderer.xy2ijkOverwrite = function() {
        var cvo = that.currentVolObject;
        that.xSlider.setValue(cvo.indexX);
        that.xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
        that.ySlider.setValue(cvo.indexY);
        that.yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
    };
};



