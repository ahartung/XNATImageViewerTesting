/**
 * Set up single volume folder's opacity slider.
 * @param {undefined}
 * @return {undefined}
 */
function initVolOpacitySlider() {
    // set attributes
    
    $('#opacitySliderVol').slider({
		orientation: 'horizontal',
		min: 0,
        max: 1,
        step: 0.01,
        value: 1,
		slide: updateOpacity,
		change: updateOpacity
    });
    /*/
    var volOpacitySlider = new goog.ui.Slider;
    volOpacitySlider.decorate(goog.dom.getElement('opacityWrapper'));
    volOpacitySlider.setMaximum(1);
    volOpacitySlider.setStep(0.01);
    volOpacitySlider.setValue(1);
    /*
    goog.events.listen(volOpacitySlider, 'drag', function(event) {
        console.log('got here');
        event.stopPropagation();
    });
    /*
    volOpacitySlider.addEventListener(goog.ui.Component.EventType.CHANGE, function(event) {
        currentVolObject.opacity = volOpacitySlider.getValue();
        event.stopPropagation();
    });
    */
}

/**
 * Change opacity of currently displayed volume object when slider changes.
 * @param {Event} event
 * @param {Object} ui
 * @return {undefined}
 */
function updateOpacity(event, ui) {
    currentVolObject.opacity = ui.value;
}
