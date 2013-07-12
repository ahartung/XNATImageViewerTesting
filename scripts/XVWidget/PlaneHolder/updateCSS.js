//******************************************************
//  updateCSS
//******************************************************
PlaneHolder.prototype.updateCSS = function (args) {
    if (this.Renderer) {
        this.Renderer.onResize_();
    }
}