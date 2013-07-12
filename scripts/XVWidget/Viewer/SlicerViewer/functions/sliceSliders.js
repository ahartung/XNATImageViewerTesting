
goog.require('goog.ui.Component');
goog.require('goog.ui.Slider');
goog.require('goog.ui.LabelInput');

var xSlider;
var ySlider;
var zSlider;
var xBox;
var yBox;
var zBox;

/**
 * Set properties and starting values of x/y/zSliders and x/y/zIndexBoxes.
 * Only called once *volume* has loaded.
 * @param {Object} obj X object sliders will control
 * @return {undefined}
 */
function initSliceSliders(that) {
    createSliders();
    createIndexBoxes();
    
    console.log(xSlider);
    
//    updateSlices(that);
    
//    addSliderListeners();
//    addIndexBoxListeners();
//    addScrollListeners();
}



function createSliders() {
    xSlider = new goog.ui.Slider;
    ySlider = new goog.ui.Slider;
    zSlider = new goog.ui.Slider;
    
    xSlider.decorate(goog.dom.getElement('xSlider'));
    ySlider.decorate(goog.dom.getElement('ySlider'));
    zSlider.decorate(goog.dom.getElement('zSlider'));
}

function createIndexBoxes() {
    xBox = goog.dom.getElement('xBox');
    yBox = goog.dom.getElement('yBox');
    zBox = goog.dom.getElement('zBox');
}



function updateSlices(that) {
    var cvo = that.currentVolObject;

    cvo.indexX = Math.round(cvo.indexX);
    cvo.indexY = Math.round(cvo.indexY);
    cvo.indexZ = Math.round(cvo.indexZ);
    
    xSlider.setMaximum(cvo.dimensions[2]-1);
    ySlider.setMaximum(cvo.dimensions[1]-1);
    zSlider.setMaximum(cvo.dimensions[0]-1);
    
    xSlider.setValue(cvo.indexX);
    ySlider.setValue(cvo.indexY);
    zSlider.setValue(cvo.indexZ);
    
    xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
    yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
    zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
}



/**
 * Updates volume object's currently displayed slices and index boxes to match
 * slider's position. Called when slider slides or changes.
 */
function addSliderListeners(that) {
    var cvo = that.currentVolObject;

    goog.events.listen(xSlider, goog.ui.Component.EventType.CHANGE, function() {
        cvo.indexX = xSlider.getValue();
        xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
        cvo.modified();
    });
    
    goog.events.listen(ySlider, goog.ui.Component.EventType.CHANGE, function() {
        cvo.indexY = ySlider.getValue();
        yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
        cvo.modified();
    });
    
    goog.events.listen(zSlider, goog.ui.Component.EventType.CHANGE, function() {
        cvo.indexZ = zSlider.getValue();
        zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
        cvo.modified();
    });
}

/**
 * Changes current indices of volume to match inputted indices. Also updates
 * slider's value. Called when index input box changes. Only called when there
 * is a renderer visible, and when that renderer is displaying a volume.
 */
function addIndexBoxListeners(that) {
    var cvo = that.currentVolObject;
    
    goog.events.listen(xBox, goog.ui.Component.EventType.CHANGE, function() {
        var sliceNum = new Number(xBox.getValue());
        if (sliceNum < 0 || sliceNum > cvo.dimensions[2] || isNaN(sliceNum)) {
            xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
        } else {
            cvo.indexX = sliceNum;
            cvo.modified();
            xSlider.setValue(sliceNum);
        }
    });
    
    goog.events.listen(yBox, goog.ui.Component.EventType.CHANGE, function() {
        var sliceNum = new Number(yBox.getValue());
        if (sliceNum < 0 || sliceNum > cvo.dimensions[1] || isNaN(sliceNum)) {
            yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
        } else {
            cvo._indexY = sliceNum;
            cvo.modified();
            ySlider.setValue(sliceNum);
        }
    });
    
    goog.events.listen(zBox, goog.ui.Component.EventType.CHANGE, function() {
        var sliceNum = new Number(zBox.getValue());
        if (sliceNum < 0 || sliceNum > cvo.dimensions[0] || isNaN(sliceNum)) {
            zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
        } else {
            cvo._indexZ = sliceNum;
            cvo.modified();
            zSlider.setValue(sliceNum); 
        }
    });
}

function addScrollListeners(that) {
    var cvo = that.currentVolObject;
    
    // set up reaction functions for scrolling
    twoDrendererX.onScroll = function() {
        xSlider.setValue(cvo.indexX);
        xBox.innerHTML = 'Frame: ' + (cvo.indexX) + ' / ' + cvo.dimensions[2];
    };
    twoDrendererY.onScroll = function() {
        ySlider.setValue(cvo.indexY);
        yBox.innerHTML = 'Frame: ' + (cvo.indexY) + ' / ' + cvo.dimensions[1];
    };
    twoDrendererZ.onScroll = function() {
        zSlider.setValue(cvo.indexZ);
        zBox.innerHTML = 'Frame: ' + (cvo.indexZ) + ' / ' + cvo.dimensions[0];
    };
}
