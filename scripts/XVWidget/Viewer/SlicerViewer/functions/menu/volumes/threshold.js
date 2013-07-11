
goog.require('goog.ui.TwoThumbSlider');

/**
 * Set up single threshold slider for volume folder.
 * @param {undefined}
 * @return {undefined}
 */
function initThreshSlider() {
    // set attributes
    var volThreshSlider = new goog.ui.TwoThumbSlider;
    volThreshSlider.decorate(goog.dom.getElement('threshSlider'));
    volThreshSlider.setMinimum(currentVolObject.min);
    volThreshSlider.setMaximum(currentVolObject.max);
    volThreshSlider.setStep(1);
    volThreshSlider.setValueAndExtent(currentVolObject.max * 0.05, currentVolObject.max * 0.95 - 1);
    
    goog.events.listen(volThreshSlider, goog.ui.Component.EventType.CHANGE, function(event) {
//        event.stopPropagation();
//        utils.dom.stopPropagation(event);
        currentVolObject.lowerThreshold = volThreshSlider.getValue();
        currentVolObject.upperThreshold = volThreshSlider.getValue() + volThreshSlider.getExtent();
    });
    
    goog.events.listen(volThreshSlider, 'drag', function(event) {
        event.stopPropagation();
        utils.dom.stopPropagation(event);
        console.log('am i here?');
    });
    
    currentVolObject.lowerThreshold = currentVolObject.max * 0.05;
}

