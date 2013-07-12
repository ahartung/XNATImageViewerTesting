
goog.require('goog.fx');
goog.require('goog.fx.dom');

function getDivFromTitle(title) {
    var id;
    switch (title) {
        case 'Sagittal':    // x
            id = 'xDiv';
            break;
        case 'Coronal':     // y
            id = 'yDiv';
            break;
        case 'Transverse':  // z
            id = 'zDiv';
            break;
    }
    return id;
}

function handle3Dto2D(oldIcon, newIcon) {
    var twoD = goog.dom.getElement(getDivFromTitle(newIcon));
    expandPanel(twoD);
}

function handle2Dto3D(oldIcon, newIcon) {
    var twoD = goog.dom.getElement(getDivFromTitle(oldIcon));
    closePanel(twoD);
}

function handle2Dto2D(oldIcon, newIcon) {
    var o = goog.dom.getElement(getDivFromTitle(oldIcon));
    var n = goog.dom.getElement(getDivFromTitle(newIcon));
    closePanel(o);
    expandPanel(n);
}


function expandPanel(elt) {
    var par = goog.dom.getParentElement(elt);
    
    var slide = new goog.fx.dom.Slide(elt, [elt.offsetLeft, elt.offsetTop],
            [0, 0], 500, goog.fx.easing.easeOut);
    
    var resize = new goog.fx.dom.Resize(elt, [elt.offsetWidth, elt.offsetHeight],
            [par.offsetWidth, par.offsetHeight], 500, goog.fx.easing.easeOut);
    
    ++elt.style.zIndex;
    
    slide.play();
    resize.play();
    
    // refresh size of canvas and sliders w/in twoD
}


function closePanel(elt) {
    var par = goog.dom.getParentElement(elt);
    var ox, oy;
    
    switch (elt.id[0]) {
        case 'x':
            ox = 0;
            oy = 0;
            break;
        case 'y':
            ox = par.offsetWidth*0.5;
            oy = 0;
            break;
        case 'z':
            ox = 0;
            oy = par.offsetHeight*0.5;
            break;
    }
    
    var slide = new goog.fx.dom.Slide(elt, [elt.offsetLeft, elt.offsetTop],
            [ox, oy], 500, goog.fx.easing.easeOut);
    
    var resize = new goog.fx.dom.Resize(elt, [elt.offsetWidth, elt.offsetHeight],
            [par.offsetWidth*0.5, par.offsetHeight*0.5], 500, goog.fx.easing.easeOut);
    
    --elt.style.zIndex;
    elt.style.top = '0';
    elt.style.left = '50%';
    elt.style.width = '50%';
    elt.style.height = '50%';
    
    slide.play();
    resize.play();
    
    // refresh size of canvas and sliders
}

