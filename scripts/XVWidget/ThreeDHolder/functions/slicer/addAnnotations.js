

ThreeDHolder.prototype.addAnnotations = function(scene) {
    var that = this;
    
    utils.array.forEach(scene.getElementsByTagName('AnnotationFiducials'), function(a) {
        var displayNodeRefs = a.getAttribute('displayNodeRef').split(' ');
        var displayNodeTypes = [];
        var pointDisplay;
        
        for (var i = 0; i < displayNodeRefs.length; ++i) {
            displayNodeTypes[i] = displayNodeRefs[i].split('vtkMRML')[1].split('Node')[0];
        }
        
        // find corresponding point display node
        utils.array.forEach(scene.getElementsByTagName(displayNodeTypes[1]), function(itemDisplay) {
            if (itemDisplay.getAttribute('id') == displayNodeRefs[1]) {
                pointDisplay = itemDisplay;
            }
        });
        
        var center = a.getAttribute('ctrlPtsCoord').split(' ');
        var colors = pointDisplay.getAttribute('color').split(' ');
        for (var i = 0; i < center.length; ++i) center[i] = parseFloat(center[i], 10);
        for (var i = 0; i < colors.length; ++i) colors[i] = parseFloat(colors[i], 10);
        
        var point = new X.sphere();
        point.center = center;
        point.radius = 4;
        point.caption = a.getAttribute('name');
        point.color = colors;
        point.opacity = parseFloat(pointDisplay.getAttribute('opacity'), 10);
        point.visible = pointDisplay.getAttribute('visibility') == 'true';
        
        that.PlaneHolder3.Renderer.add(point);
        that.addToMenu(point, a.getAttribute('name'), 'sphere');
    });
    
}