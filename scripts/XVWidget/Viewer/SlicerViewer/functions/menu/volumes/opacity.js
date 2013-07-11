/**
 * Set up single volume folder's opacity slider.
 * @param {undefined}
 * @return {undefined}
 */
function initVolOpacitySlider() {
    // set attributes
    var volOpacitySlider = new goog.ui.Slider;
    volOpacitySlider.decorate(goog.dom.getElement('opacitySliderVol'));
    volOpacitySlider.setMaximum(1);
    volOpacitySlider.setStep(0.01);
    volOpacitySlider.setValue(1);
    
    goog.events.listen(volOpacitySlider, goog.ui.Component.EventType.CHANGE, function(event) {
        currentVolObject.opacity = volOpacitySlider.getValue();
    });
}

