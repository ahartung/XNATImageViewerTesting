/**
 * Creates a 'file' div to contain a button and file label (and opacity slider
 * if not a volume). Adds components to content of folder and attaches listeners.
 * @param {Element} parent Folder content being added to
 * @param {String} file Filename / filepath
 * @param {String} type Type of X object file represents
 * @return {undefined}
 */
function addFileToFolder(parent, file, type) {
    // outer file element containing both button and label
    var outerFileDiv = goog.dom.createDom('div', {
        'id': 'outerFileDiv' + file,
        'class': 'outerFileDiv ' + type + 'File' });
    
    // create button and label
    addVisibilityButton(outerFileDiv, file, type);
    
//    console.log('adding to the ' + type + ' folder');
    // add to folder's contents
    if (type == 'volume')
        goog.dom.insertSiblingBefore(outerFileDiv, goog.dom.getElement('marker'));
    else {
        console.log('making a nonvol opacity slider');
        // if not a volume, each file get its own opacity slider
        var s = goog.dom.createDom('div', { 'id': file, 'class': 'opacityNonvol' })
        goog.dom.appendChild(outerFileDiv, s);
        
        console.log(s);
        console.log(document.getElementById(file));
        
        goog.dom.insertChildAt(parent, outerFileDiv, -1);
        var updateNonvolOpacity = new goog.ui.Slider;
        updateNonvolOpacity.decorate(s);
        updateNonvolOpacity.setMaximum(1);
        updateNonvolOpacity.setStep(0.01);
        updateNonvolOpacity.setValue(1);
        
        goog.events.listen(updateNonvolOpacity, goog.ui.Component.EventType.CHANGE, function(event) {
            var obj = getObjFromList(file);
            obj.opacity = updateNonvolOpacity.getValue();
        });
    }
    
    // listen for changes
    addVisibilityButtonListener(type, file);
}

/**
 * Creates a 'visibility button' (either checkbox or radio button) and a label.
 * @param {Element} parent Outer file div element to add to
 * @param {String} file Filename / filepath
 * @param {String} type Type of X object file represents
 * @return {undefined}
 */
function addVisibilityButton(parent, file, type) {
    var buttontype;
    if (type == 'volume') buttontype = 'radio'; else buttontype = 'checkbox';
    
    goog.dom.append(parent, [
        goog.dom.createDom('input', {
            'id': type + 'ButtonFor' + file,
            'type': buttontype,
            'name': type + 'Button',
            'checked': 'checked'}),
        goog.dom.createDom('label', { 
            'for': type + 'ButtonFor' + file,
            'class': 'innerFileDiv',
            'innerHTML': file })
    ]);
}

/**
 * Sets the visibility of an object when the visibility button changes.
 * @param {String} type Type of X object
 * @param {String} file Filename / filepath
 * @return {undefined}
 */
function addVisibilityButtonListener(type, file) {
    goog.events.listen(goog.dom.getElement(type + 'ButtonFor' + file),
                       goog.events.EventType.CHANGE,
                       function(event) {
        var selectedObject = getObjFromList(file);
        if (type == 'volume') { toggleVolumeVisibility(selectedObject); }
        if (this.checked) { selectedObject.visible = true; } // add to viewer
        else { selectedObject.visible = false; } // remove from viewer
    });
}








/**
 * Set up per-file opacity slider.
 * @param {String} file Filename / filepath
 * @return {undefined}
 */
function initNonvolOpacitySlider(file) {

    
}

