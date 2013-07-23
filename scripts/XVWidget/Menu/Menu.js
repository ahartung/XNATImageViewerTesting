
goog.provide('Menu');

goog.require('goog.ui.TwoThumbSlider');
goog.require('XVWidget');
/**
 * @constructor
 * @extends {XVWidget}
 */
Menu = function(Holder, args) {
    goog.base(this, utils.dom.mergeArgs(Menu.prototype.defaultArgs, args));
    
    this.ThreeDHolder = Holder;
    
    this.currentVolObject;
    this.currentObjects = [];
    
    this.objOpacityPairs = [];
    this.objThreshPairs = [];
    this.objOpacity = {};
    this.objThresh = {};
    
    this.voluContent = this.makeSubmenu('volumes', '7%');
    this.meshContent = this.makeSubmenu('meshes', '38%');
    this.fibrContent = this.makeSubmenu('fibers', '69%');
    utils.dom.makeElement('div', this.voluContent, 'VolRendLabel', {
        position: 'relative',
        'text-align': 'right',
        color: '#000',
    }).innerHTML = '<b>| V | R | </b>';
    
    this.volOpacitySlider;
    this.volThresholdSlider;
    this.volRenderButton;
    this.volVisibleButton;
    
}
goog.inherits(Menu, XVWidget);


/**
 * Returns the already-created X object that matches the provided file.
 * @param {String} f Filename / filepath
 * @return {Object | undefined}
 */
Menu.prototype.getObjFromList = function(f) {
    var ext = getFileExt(f);
    
    if (ext === 'dcm' || ext === 'dicom') {
        for (var i = 0; i < this.currentObjects.length; ++i) {
            if (this.currentObjects[i].file[0].indexOf(f.slice(0,-9)) > -1)
                return this.currentObjects[i];
        }
    } else {
        for (var i = 0; i < this.currentObjects.length; ++i) {
            if (this.currentObjects[i].file == f) return this.currentObjects[i];
        }
    }
}


Menu.prototype.makeSubmenu = function(title, leftcss) {
    elt = utils.dom.makeElement('div', this.widget, "Content",
                                utils.dom.mergeArgs(this.folderContentCSS, {left: leftcss}));
    var h = utils.dom.makeElement('div', elt, "FolderHeader", this.folderHeaderCSS);
    h.innerHTML = title;
    return elt;
}


Menu.prototype.findAndSelectCheckbox = function(file, filetype) {
    if (file.split('/3D/')[1])
        file = file.split('/3D/')[1];
        
    var fileBoxes = goog.dom.getElementsByClass('Checkbox', this.widget);
    utils.array.forEach(fileBoxes, function(box) {
        if (box.id === filetype + 'ButtonFor' + file) {
            box.checked = 'checked';
        }
    });
};


