/*
 * @type {function()}
 * @protected
 */
Modal.prototype.initViewerDragDrop = function() {
	
	var that = this;
	
	/**
	 * @type {Object.<string, function(goog.ui.event)>}
	 * @protected
	 */
	this.viewerBoxDragDrop = {};


	this.viewerBoxDragDrop['dragover'] = function(event) {
		if (event.dragSourceItem.element.className.indexOf(GLOBALS.classNames.Viewer) > -1) {
			
			var target = event.dropTargetItem.element;
			var source = event.dragSourceItem.element;
			var sDims = utils.css.dims(source);
			var tDims = utils.css.dims(target);

			
			var d = new Date();
			var n = d.getTime();
			var p = (source.clickTime) ? source.clickTime : undefined;
			var clone = this;
			var inserted = false;
			source.clickTime = n;
			
			//
			//  Weird double events sent out..
			//
			if (p  && (n-p) < 200) {
				return;
			}
			

			utils.css.setCSS(source, tDims);
			target.oldDims = sDims;
			source.oldDims = tDims;
						
			var slide = new goog.fx.dom.Slide(target, [tDims.left, tDims.top], 
													  [sDims.left, sDims.top], 
													  GLOBALS.animFast);
			slide.play();

			goog.events.listen(slide, goog.fx.Transition.EventType.END, function() {
				utils.css.setCSS(target, sDims);			
			});

			
			XV.Viewers({'swap' : [source, target]});
		}
		
	}
	
	
	this.viewerBoxDragDrop['dragOut'] = function(event) {

		event.dropTargetItem.element.style.borderColor = event.dropTargetItem.element.prevBorder;
	}
	
	
	this.viewerBoxDragDrop['drop'] = function(event) {
		if (event.dragSourceItem.element.className.indexOf(GLOBALS.classNames.Viewer) > -1) {
			utils.css.setCSS(event.dragSourceItem.element, 
							 event.dragSourceItem.element.oldDims);
			XV.Viewers(function(viewer){
				utils.fx.fadeIn(viewer.widget, 0);	
			})	
		}
	}
	
	
	
	this.viewerBoxDragDrop['dragstart'] = function(event) {
		//
		//  Doesn't cleanup the clones when you drag a child
		//  of the Viewer.  In this case, when you drag a slider, 
		//  and don't want the viewer to drag, you need to remove the clone
		//  still.
		//
		event.dragSourceItem.element.isCloneable = true;
		
		if (event.dragSourceItem.currentDragElement_.className.indexOf('slider') > -1) {
		
			that.disableViewerDragAndDrop();	
			event.dragSourceItem.element.isCloneable = false;
			
		}
		else {
			console.log(event.dragSourceItem.element.isCloneable)
			that.enableViewerDragAndDrop();
			utils.fx.fadeOut(event.dragSourceItem.element, GLOBALS.animFast);
			XV.Viewers(function(viewer){
				viewer.widget.oldDims = utils.css.dims(viewer.widget);
			})
							
		}
	}	
	

	this.viewerBoxDragDrop['dragend'] = function(event) {

		XV.Viewers(function(viewer) { 
			utils.css.setCSS(viewer.widget, viewer.widget.oldDims);	
			delete viewer.widget.oldDims;
		})

						 
						 
		utils.fx.fadeIn(event.dragSourceItem.element, GLOBALS.animFast);
		
	}	

	
}



/**
 * @protected
 */
Modal.prototype.setViewerDragAndDrop = function () {

	var that = this;
	var viewerLen = XV.Viewers("total");

	if (viewerLen > 1) {
		
		//	
	    // Set valid targets for this.draggableWidgets
		//
		XV.Viewers(function (viewer) {
			
			XV.Viewers(function (w) {
				if (viewer !== w) { 
					viewer.addTarget(w);
				}
			});
			goog.events.listen(viewer, 'dragstart', that.viewerBoxDragDrop['dragstart']);	
		})
	
		that.enableViewerDragAndDrop();	
		
	}

}



Modal.prototype.disableViewerDragAndDrop = function () {
	
	var that = this;
	
	XV.Viewers(function (viewer) {

		//goog.events.unlisten(viewer, 'dragstart', that.viewerBoxDragDrop['dragstart']);	
		goog.events.unlisten(viewer, 'drop', that.viewerBoxDragDrop['drop']);	
		goog.events.unlisten(viewer, 'dragover', that.viewerBoxDragDrop['dragover']);	
		goog.events.unlisten(viewer, 'dragend', that.viewerBoxDragDrop['dragend']);	

	})		
	

}



Modal.prototype.enableViewerDragAndDrop = function () {
	
	var that = this;

	XV.Viewers(function (viewer) {
		viewer.init();
		//goog.events.listen(viewer, 'dragstart', that.viewerBoxDragDrop['dragstart']);	
		goog.events.listen(viewer, 'drop', that.viewerBoxDragDrop['drop']);	
		goog.events.listen(viewer, 'dragover', that.viewerBoxDragDrop['dragover']);	
		goog.events.listen(viewer, 'dragend', that.viewerBoxDragDrop['dragend']);	

	})		
	

}