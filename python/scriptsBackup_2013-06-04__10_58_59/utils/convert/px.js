utils.convert.px = function (args) {
	if (args instanceof Array) {
		return args.map(function (a) {return a.toString() + 'px'});
	}
	else{
		switch (typeof args) {
			case 'number':
				return args.toString() + "px";
		}
	}
}