
//******************************************************
//  Init
//******************************************************
goog.provide('PlaneDHolder');

goog.require('X.renderer3D');
goog.require('X.renderer2D');
goog.require('XVWidget');
/**
 * @constructor
 * @extends {XVWidget}
 */
PlaneHolder = function(id, args) {
	goog.base(this, utils.dom.mergeArgs(PlaneHolder.prototype.defaultArgs, args));
	
	//----------------------------------
	//	ONLOAD CALLBACKS
	//----------------------------------
	this.onloadCallbacks = [];
    
    
    
    //----------------------------------
    // CREATE RENDERER
    //----------------------------------
    if (id !== 'v') {
        this.Renderer = new X.renderer2D();
        this.Renderer.orientation = id.toUpperCase();
        this.addSliderAndFrameNum(id);
    } else {
        this.Renderer = new X.renderer3D();
    }
    
    this.Renderer.container = this.widget.id;
    this.Renderer.init();
    
    if (id === 'v') {
        this.Renderer.render();
    }
    
    //	this.updateCSS();
}
goog.inherits(PlaneHolder, XVWidget);



/*
 * @type {object}
 * @protected
 */
PlaneHolder.prototype.defaultArgs = {
	className: GLOBALS.classNames.PlaneHolder,
	parent: document.body,
	blankMsg : "drag and drop Thumbnail here",
	CSS: {
		position: 'absolute',
		height: '50%',
		width: '50%',
        top: '0%',
        left: '0%',
		"overflow": "hidden",
        'display': 'inline',
        'background': '#000',
  	}
}


PlaneHolder.prototype.addSliderAndFrameNum = function(id) {
    goog.dom.append(this.widget, [goog.dom.createDom('div', { 'id': id+'Slider', 'class': 'slice' }),
                                  goog.dom.createDom('div', { 'id': id+'Box', 'class': 'box' })]);
}



//******************************************************
//  Adds Callback methods once all the images (frames)
//  are loaded.
//******************************************************
PlaneHolder.prototype.addOnloadCallback = function (callback) {
	this.onloadCallbacks.push(callback)
}




