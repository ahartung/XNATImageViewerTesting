

ThreeDHolder.prototype.addObject = function(file, filetype, attributes, isSlicer) {
    
    var isVol = filetype == 'volume';
    var newObj = createXObject(file);
    
    if (attributes) {
        // color -- volumes: .maxColor, meshes: .color
        var colors = attributes['color'].split(' ');
        for (var i = 0; i < colors.length; ++i) colors[i] = parseFloat(colors[i], 10);
        newObj.color = colors;
        
        if (attributes['colorTable']) {
            console.log(file + attributes['colorTable']);
//            newObj.labelmap.colortable.file = file + attributes['colorTable'];
        }
        
        // opacity
        newObj.opacity = parseFloat(attributes['opacity'], 10);
        
        // visibility
        newObj.visible = attributes['visibility'] == 'true';
    }
    
    
    this.currentObjects.push(newObj);
    this.addToMenu(newObj);
    
    this.PlaneHolder3.widget.style.background = '#000';//(isSlicer) ? '#aae' : '#000';
    this.PlaneHolder3.Renderer.add(newObj);
    this.setOnShowtime(isVol, newObj);
}