/**
 * Creates a 'file' div to contain a button and file label (and opacity slider
 * if not a volume). Adds components to content of folder and attaches listeners.
 * @param {Element} parent Folder content being added to
 * @param {String} file Filename / filepath
 * @param {String} type Type of X object file represents
 * @return {undefined}
 */
Menu.prototype.addFileToFolder = function(newObj, file, filetype) {
    var that = this;
    
    var parent;
    if      (filetype == 'volume') parent = that.voluContent;
    else if (filetype == 'mesh')   parent = that.meshContent;
    else if (filetype == 'fiber')  parent = that.fibrContent;
    
    if (file.split('/3D/')[1])
        file = file.split('/3D/')[1];
        
    // outer file element containing both button and label
    var outerFileDiv = goog.dom.createDom('div', {
        'id': 'outerFileDiv' + file,
        'class': 'outerFileDiv ' + filetype + 'File' });
    
    goog.dom.insertChildAt(parent, outerFileDiv, -1);
    
    // add to folder's contents
    if (filetype == 'volume') {
        this.addVolFileAndButton(outerFileDiv, newObj, file, filetype);
        this.addOpacitySlider(parent, newObj);
        this.addThreshSlider(parent, newObj);
        // add threshold slider later (once volume has loaded)
    } else {
        this.addNonvolFileAndButton(outerFileDiv, newObj, file, filetype);
        this.addOpacitySlider(parent, newObj);
    }

    utils.dom.makeElement('div', parent, 'Spacer', { height: '10px', });
    
};

/**
 * Creates a 'visibility button' (either checkbox or radio button) and a label.
 * @param {Element} parent Outer file div element to add to
 * @param {String} file Filename / filepath
 * @param {String} type Type of X object file represents
 * @return {undefined}
 */
Menu.prototype.addNonvolFileAndButton = function(parent, newObj, file, type) {
    var that = this;
    var toCheck = (newObj.visible) ? 'checked' : '';
    var innerHTML = file.split('/Data/')[1] || file;
    
    var button = goog.dom.createDom('input', {
            'id': type + 'ButtonFor' + file,
            'type': 'checkbox',
            'class': 'Checkbox',
            'name': type + 'Button' + that.widget.id,
            'checked': toCheck});
    goog.dom.append(parent, [
        button,
        goog.dom.createDom('label', { 
            'for': type + 'ButtonFor' + file,
            'class': 'innerFileDiv',
            'innerHTML': innerHTML })
    ]);
    
    goog.events.listen(button, goog.events.EventType.CHANGE, function(event) {
        newObj.visible = this.checked;
        that.objOpacity[newObj.file].setEnabled(this.checked);
    });
    
};


Menu.prototype.addVolFileAndButton = function(parent, newObj, file, type) {
    var that = this;
    var visToCheck = (newObj.visible) ? 'checked' : '';
    var rendToCheck = (newObj.volumeRendering) ? 'checked' : '';
    var innerHTML = file.split('/Data/')[1] || file;
    
    var radiobutton = goog.dom.createDom('input', {
            'id': type + 'ButtonFor' + file,
            'type': 'radio',
            'class': 'Checkbox',
            'name': type + 'Button' + that.widget.id,
            'checked': 'checked'});
    var visbutton = goog.dom.createDom('input', {
            'id': type + 'VisButtonFor' + file,
            'type': 'checkbox',
            'class': 'Checkbox',
            'name': type + 'VisButton' + that.widget.id,
            'checked': visToCheck });
    var rendbutton = goog.dom.createDom('input', {
            'id': type + 'RendButtonFor' + file,
            'type': 'checkbox',
            'class': 'Checkbox',
            'name': type + 'RendButton' + that.widget.id,
            'checked': rendToCheck });
    goog.dom.append(parent, [
        radiobutton,
        goog.dom.createDom('label', { 
            'for': type + 'ButtonFor' + file,
            'class': 'innerFileDiv',
            'innerHTML': innerHTML }),
        visbutton,
        rendbutton,
    ]);
    
    goog.events.listen(radiobutton, goog.events.EventType.CHANGE, function(event) {
        that.currentVolObject = newObj;
        that.ThreeDHolder.update2Drenderers(newObj);
        that.ThreeDHolder.updateSlices();
    });
    
    goog.events.listen(visbutton, goog.events.EventType.CHANGE, function(event) {
        newObj.visible = this.checked;
        // disable/enable rendering option and sliders
        rendbutton.disabled = (this.checked) ? '' : 'disabled';
        that.objOpacity[newObj.file].setEnabled(this.checked);
        that.objThresh[newObj.file].setEnabled(this.checked);
    });
    
    goog.events.listen(rendbutton, goog.events.EventType.CHANGE, function(event) {
        newObj.volumeRendering = this.checked;
    });
};


Menu.prototype.addOpacitySlider = function(parent, newObj) {
    // must set tab pane visibility to 'block' in order for sliders to init properly
    this.widget.parentElement.style.display = 'block';
    
    var opacity = new goog.ui.Slider;
    utils.dom.makeElement('div', parent, 'SliderLabel', this.sliderLabelCSS).innerHTML = 'O';
    opacity.decorate(utils.dom.makeElement('div', parent, 'Opacity', this.longSliderCSS));
    opacity.setMaximum(1);
    opacity.setStep(0.01);
    opacity.setValue(1);
    
    goog.events.listen(opacity, goog.ui.Component.EventType.CHANGE, function(event) {
        newObj.opacity = opacity.getValue();
    });
    
    this.objOpacity[newObj.file] = opacity;
    this.objOpacityPairs.push([newObj, opacity]);
};


Menu.prototype.updateOpacitySlider = function() {
    utils.array.forEach(this.objOpacityPairs, function(pair) {
        var object = pair[0];
        var slider = pair[1];
        
        slider.setValue(parseFloat(object.opacity));
        slider.setEnabled(object.visible);
    });
}



Menu.prototype.addThreshSlider = function(parent, newObj) {
    var thresh = new goog.ui.TwoThumbSlider;
    utils.dom.makeElement('div', parent, 'SliderLabel', this.sliderLabelCSS).innerHTML = 'T';
    thresh.decorate(utils.dom.makeElement('div', parent, 'Threshold', this.longSliderCSS));
    thresh.setStep(1);
    
    var that = this;
    goog.events.listen(thresh, goog.ui.Component.EventType.CHANGE, function(event) {
        newObj.lowerThreshold = thresh.getValue();
        newObj.upperThreshold = thresh.getValue() + thresh.getExtent();
    });
    
    this.objThresh[newObj.file] = thresh;
    this.objThreshPairs.push([newObj, thresh]);
};


Menu.prototype.updateThreshSlider = function() {
    utils.array.forEach(this.objThreshPairs, function(pair) {
        var object = pair[0];
        var slider = pair[1];
        
        slider.setEnabled(object.visible);
        slider.setMinimum(object.min);
        slider.setMaximum(object.max);
        slider.setValueAndExtent(object.max * 0.05 + 1, object.max * 0.95 - 1);
        object.lowerThreshold = object.max * 0.05 + 1;
        object.upperThreshold = object.max;
        
    });
};

