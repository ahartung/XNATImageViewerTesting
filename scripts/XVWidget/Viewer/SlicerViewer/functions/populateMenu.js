
SlicerViewer.prototype.populateMenu = function () {	
	var that = this;
    
    //----------------------------------
    //	SCROLL GALLERY
    //----------------------------------
    
    var counter = 0;
    var className = "Menu_ScrollGallery";
    
    that.Menu = new ScrollGallery({
        parent: that.ScanTabs.getTab("Menu"),
        className: className,
        orientation: "vertical",
        widgetCSS: {
            left: 0,
            height: '100%',
            width: '100%',
            top: GLOBALS.scanTabLabelHeight + 10
        }
    });	
    var contents = utils.dom.makeElement("div", that.Menu.getScrollArea(), className + "_MetadataContents", {});
    
    
    this.MenuNew = new MenuNew({
        parent: contents,
    });
    this.ThreeDHolder.voluContent = this.MenuNew.addFolder('Volumes');
    this.ThreeDHolder.meshContent = this.MenuNew.addFolder('Meshes');
    this.ThreeDHolder.fibrContent = this.MenuNew.addFolder('Fibers');
    
	
}
