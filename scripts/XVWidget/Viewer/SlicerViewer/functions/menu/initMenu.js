/**
 * Creates a toggle menu div element with 3 folders. Sets menu to be draggable.
 * @param {undefined}
 * @return {undefined}
 */
function initMenu() {
    // create menu
    var m = goog.dom.createDom('div', { 'id': 'menuDiv', 'class': 'toggleMenu' });
    goog.dom.appendChild(goog.dom.getElement('vDiv'), m);
    
    // create primary header and content
    var mHeader = goog.dom.createDom('div', {
        'id': 'menuHeader',
        'class': 'menu collapsibleHeader',
        'innerHTML': 'hide menu' });
    menuContent = goog.dom.createDom('div', {
        'id': 'menuContent',
        'class': 'menu collapsibleContent' });
    goog.dom.append(m, [mHeader, menuContent]);
    
//    voluContent = addFolderToMenu('volumes');
//    meshContent = addFolderToMenu('meshes');
//    fibrContent = addFolderToMenu('fibers');
    
    // be able to move menu around viewer
    // TODO: set limits
    var mDrag = new goog.fx.Dragger(goog.dom.getElement('menuDiv'));
    goog.events.listen(mDrag, goog.events.EventType.DRAG, function(event) {
//        console.log(event.currentTarget.target.className);
//        if (event.currentTarget.target.className.toLowerCase().indexOf('slider') > -1) {
//            console.log('sliding');
//        }
    });
    mDrag.setHysteresis(5);
}

/**
 * Sets the folder headers and menu header to all be collapsible by clicking.
 * Toggles menu header text between show/hide menu.
 * @param {undefined}
 * @return {undefined}
 */
function initCollapsible() {
    // all headers cause collapse
    var mZippy = new goog.ui.AnimatedZippy('menuHeader', 'menuContent', false);
    var vZippy = new goog.ui.AnimatedZippy('volumesHeader', 'volumesContent', true);
    var mZippy = new goog.ui.AnimatedZippy('meshesHeader', 'meshesContent', true);
    var fZippy = new goog.ui.AnimatedZippy('fibersHeader', 'fibersContent', true);

    // for whole menu toggle only: change text from show / hide
    goog.events.listen(goog.dom.getElement('menuHeader'), 'click', function(event) {
        event.target.innerHTML =
            (event.target.innerHTML == 'show menu') ? 'hide menu' : 'show menu';
    });
}


