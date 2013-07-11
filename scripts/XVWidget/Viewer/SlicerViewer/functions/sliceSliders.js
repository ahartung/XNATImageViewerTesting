
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
function initSliceSliders() {
    createSliders();
    createIndexBoxes();
    
    updateSlices();
    
    addSliderListeners();
    addIndexBoxListeners();
    addScrollListeners();
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
    /*
    xBox = new goog.ui.LabelInput;
    yBox = new goog.ui.LabelInput;
    zBox = new goog.ui.LabelInput;
    
    xBox.decorate(goog.dom.getElement('xIndexBox'));
    yBox.decorate(goog.dom.getElement('yIndexBox'));
    zBox.decorate(goog.dom.getElement('zIndexBox'));
    */
    /*
    xBox = goog.dom.getElement('xIndexBox');
    yBox = goog.dom.getElement('yIndexBox');
    zBox = goog.dom.getElement('zIndexBox');
    */
    xBox = goog.dom.getElement('xBox');
    yBox = goog.dom.getElement('yBox');
    zBox = goog.dom.getElement('zBox');
}

/**
 * Updates volume object's currently displayed slices and index boxes to match
 * slider's position. Called when slider slides or changes.
 */
function addSliderListeners() {
    goog.events.listen(xSlider, goog.ui.Component.EventType.CHANGE, function() {
        currentVolObject.indexX = xSlider.getValue();
        xBox.innerHTML = 'Frame: ' + (currentVolObject.indexX) + ' / ' + currentVolObject.dimensions[2];
//        xBox.innerHTML = (currentVolObject.indexX);
        currentVolObject.modified();
    });
    
    goog.events.listen(ySlider, goog.ui.Component.EventType.CHANGE, function() {
        currentVolObject.indexY = ySlider.getValue();
        yBox.innerHTML = 'Frame: ' + (currentVolObject.indexY) + ' / ' + currentVolObject.dimensions[1];
//        yBox.innerHTML = (currentVolObject.indexY);
        currentVolObject.modified();
    });
    
    goog.events.listen(zSlider, goog.ui.Component.EventType.CHANGE, function() {
        currentVolObject.indexZ = zSlider.getValue();
        zBox.innerHTML = 'Frame: ' + (currentVolObject.indexZ) + ' / ' + currentVolObject.dimensions[0];
//        zBox.innerHTML = (currentVolObject.indexZ);
        currentVolObject.modified();
    });
}

/**
 * Changes current indices of volume to match inputted indices. Also updates
 * slider's value. Called when index input box changes. Only called when there
 * is a renderer visible, and when that renderer is displaying a volume.
 */
function addIndexBoxListeners() {
    
    goog.events.listen(xBox, goog.ui.Component.EventType.CHANGE, function() {
        var sliceNum = new Number(xBox.getValue());
        if (sliceNum < 0 || sliceNum > currentVolObject.dimensions[2] || isNaN(sliceNum)) {
            xBox.innerHTML = 'Frame: ' + (currentVolObject.indexX) + ' / ' + currentVolObject.dimensions[2];
//            xBox.innerHTML = (xSlider.getValue());
        } else {
            currentVolObject.indexX = sliceNum;
            currentVolObject.modified();
            xSlider.setValue(sliceNum);
        }
    });
    
    goog.events.listen(yBox, goog.ui.Component.EventType.CHANGE, function() {
        var sliceNum = new Number(yBox.getValue());
        if (sliceNum < 0 || sliceNum > currentVolObject.dimensions[1] || isNaN(sliceNum)) {
            yBox.innerHTML = 'Frame: ' + (currentVolObject.indexY) + ' / ' + currentVolObject.dimensions[1];
//            yBox.innerHTML = (ySlider.getValue());
        } else {
            currentVolObject._indexY = sliceNum;
            currentVolObject.modified();
            ySlider.setValue(sliceNum);
        }
    });
    
    goog.events.listen(zBox, goog.ui.Component.EventType.CHANGE, function() {
        var sliceNum = new Number(zBox.getValue());
        if (sliceNum < 0 || sliceNum > currentVolObject.dimensions[0] || isNaN(sliceNum)) {
            zBox.innerHTML = 'Frame: ' + (currentVolObject.indexZ) + ' / ' + currentVolObject.dimensions[0];
//            zBox.innerHTML = (zSlider.getValue());
        } else {
            currentVolObject._indexZ = sliceNum;
            currentVolObject.modified();
            zSlider.setValue(sliceNum); 
        }
    });
}

function addScrollListeners() {
    // set up reaction functions for scrolling
    twoDrendererX.onScroll = function() {
        xSlider.setValue(currentVolObject.indexX);
        xBox.innerHTML = 'Frame: ' + (currentVolObject.indexX) + ' / ' + currentVolObject.dimensions[2];
//        xBox.innerHTML = (currentVolObject.indexX);
    };
    twoDrendererY.onScroll = function() {
        ySlider.setValue(currentVolObject.indexY);
        yBox.innerHTML = 'Frame: ' + (currentVolObject.indexY) + ' / ' + currentVolObject.dimensions[1];
//        yBox.innerHTML = (currentVolObject.indexY);
    };
    twoDrendererZ.onScroll = function() {
        zSlider.setValue(currentVolObject.indexZ);
        zBox.innerHTML = 'Frame: ' + (currentVolObject.indexZ) + ' / ' + currentVolObject.dimensions[0];
//        zBox.innerHTML = (currentVolObject.indexZ);
    };
}

function updateSlices() {
    currentVolObject.indexX = Math.round(currentVolObject.indexX);
    currentVolObject.indexY = Math.round(currentVolObject.indexY);
    currentVolObject.indexZ = Math.round(currentVolObject.indexZ);
    
    xSlider.setMaximum(currentVolObject.dimensions[2]-1);
    ySlider.setMaximum(currentVolObject.dimensions[1]-1);
    zSlider.setMaximum(currentVolObject.dimensions[0]-1);
    
    xSlider.setValue(currentVolObject.indexX);
    ySlider.setValue(currentVolObject.indexY);
    zSlider.setValue(currentVolObject.indexZ);
    /*
    xBox.innerHTML = (currentVolObject.indexX);
    yBox.innerHTML = (currentVolObject.indexY);
    zBox.innerHTML = (currentVolObject.indexZ);
    */
    xBox.innerHTML = 'Frame: ' + (currentVolObject.indexX) + ' / ' + currentVolObject.dimensions[2];
    yBox.innerHTML = 'Frame: ' + (currentVolObject.indexY) + ' / ' + currentVolObject.dimensions[1];
    zBox.innerHTML = 'Frame: ' + (currentVolObject.indexZ) + ' / ' + currentVolObject.dimensions[0];
}
