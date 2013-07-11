/**
 * Toggles the volume folder's sliders and checkboxes to match the values
 * of the currently displayed object. Called when the volume object that is 
 * displayed changes.
 * @param {Object} newObj X object that is newly selected
 * @return {undefined}
 */
function toggleVolumeVisibility(newObj) {
    currentVolObject.visible = false;
    currentVolObject = newObj;
    
    // set rendering option to match object property
    goog.dom.getElement('renderButtonForVolumes').checked =
        (currentVolObject.volumeRendering) ? 'checked' : '';
    
    // set threshold sliders to match object properties
    var tSlider = goog.dom.getElement('threshSlider');
    tSlider.setMinimum(currentVolObject.min);
    tSlider.setMaximum(currentVolObject.max);
    tSlider.setValueAndExtent(currentVolObject.lowerThreshold,
        currentVolObject.upperThreshold - currentVolObject.lowerThreshold);
    
    // set opacity slider to match object property
    goog.dom.getElement('opacitySliderVol').setValue(currentVolObject.opacity);
    
    update2Drenderers(newObj);  // updates 2D renderers so that correct images are displayed
}
