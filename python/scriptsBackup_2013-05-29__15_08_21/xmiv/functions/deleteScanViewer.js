

XMIV.prototype.deleteScanViewer = function (ScanViewer) {
		 
		 var that = this;
		 var animLen = 500;
		 
		 
		 
		//-------------------------
		// 1.  Stop any ongoing animations
		//-------------------------		
		 $(that.modal).stop();
		 $(that.closeButton).stop();

		 

		//-------------------------
		// 1. Unlink the ScanViewer sliders from one another
		//-------------------------			
		for (var i in this.ScanViewers) {
			for (var j in this.ScanViewers[i]) {
				//that.ScanViewers[i][j].frameSlider.clearLinked();
				//$(that.ScanViewers[i][j].widget).unbind('mouseover');
				//$(that.ScanViewers[i][j].widget).unbind('mouseout');
			}	
		}
		
		
		
		//-------------------------
		// 2. Remove ScanViewer from global matrix
		//-------------------------	
		var prevRowCount = this.ScanViewers.length;
		spliceInRow(this.ScanViewers, ScanViewer);
		
		
		

		//-------------------------
		// 3. Remove horizontal expand buttons and regenerate
		//-------------------------	
		this.regenerateExpandButtons_Horiz(this.ScanViewers.length);
		this.regenerateExpandButtons_Vert(__numColumns__(this.ScanViewers));


		
		//-------------------------
		// 3.  If no scanviewers left, destroy modal
		//-------------------------			
		if (__lengthMD__(that.ScanViewers) == 0) {
			that.destroy();
			return;
		}



		$(ScanViewer.widget).stop().fadeTo(animLen, 0, function () {
			that.modal.removeChild(ScanViewer.widget);
		});
		
		
		//----------------------------------
		//	4. remove dropZone
		//----------------------------------
		this.deleteDropZone(ScanViewer.FrameViewer);
		

		/*
		//-------------------------
		// Fade out expandButton, then delete it
		//-------------------------			
		$(that.verticalExpandButtons[viewerInd]).stop().fadeTo(animLen, 0, function () {
			that.modal.removeChild(that.verticalExpandButtons[viewerInd]);
			that.verticalExpandButtons.splice(viewerInd , 1);
		});
		
		
		//-------------------------
		// Fade out linkButton, then delete it
		//-------------------------		
		
		// check the position of the link, special case for viewerInd == 0
		scrollLinkInd = viewerInd -1;
		if (viewerInd == 0) { scrollLinkInd = 0 };

		// remember what is active and what isn't
		var activeList = [];
		
		
		// deactivate and delete all scroll links
		for (var j=0; j<that.scrollLinks.length; j++) {

			// track the state of the current ones
			if (j != scrollLinkInd) { 
				activeList.push($(that.scrollLinks[j]).data('activated'));
			}
			
			// fade out the scrollLinks
			var sl = that.scrollLinks[j];
			$(sl).fadeTo(animLen, 0, function () {

				if (this == that.scrollLinks[that.scrollLinks.length - 1]) {
					//console.log("HERE");
					for (var k=0; k<that.scrollLinks.length; k++) {
						that.modal.removeChild(that.scrollLinks[k]);
					}
					that.scrollLinks = [];
					
					animateModalChange(that, animLen, {
						modal: [function () {
							for (var i=0; i<__lengthMD__(that.ScanViewers); i++) {
								if (i > 0) that.addScrollLinkIcon();	
							}
							for (var i=0; i<that.scrollLinks.length; i++) {
								
								if(activeList[i]) {
									that.scrollLinks[i].onclick('activate', 0);	
								}
							}
						}]
					});
				}

			});
			

		}
	*/
		
		this.animateModalChange(animLen, {
			modal: [function () {
				/*
				for (var i=0; i<__lengthMD__(that.ScanViewers); i++) {
					if (i > 0) that.addScrollLinkIcon();	
				}
				for (var i=0; i<that.scrollLinks.length; i++) {
					
					if(activeList[i]) {
						that.scrollLinks[i].onclick('activate', 0);	
					}
				}
				*/
			}]
		});
}
