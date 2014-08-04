function blurReduction () {
	if (blur != 0) {
		blur-= 0.5;
		var new_blur = 'blur(' + blur + 'px)';
		addPrefixes("filter", "#guessImg", new_blur);
	} else {
		clearInterval(blur_interval);
	}
}

function resetGrayscale() {
	var new_grayscale = 'blur(' + BASEBLUR + 'px) grayscale(' + BASEGRAYSCALE + ')';
	addPrefixes("filter", "#guessImg", new_grayscale);
}

function grayscaleReduction () {
	if (grayscale != 0 || blur != 0) {
		if (blur != 0) {
			blur -= 0.5;
		}
		if (grayscale != 0) {
			base_graysclae -= 0.05;
		}
		var new_grayscale = 'blur(' + blur + 'px) grayscale(' + grayscale + ')';
		addPrefixes("filter", "#guessImg", new_grayscale);
	} else {
		clearInterval(grayscale_interval);
	}
}

function resetHue() {
	var new_hue = 'blur(' + BASEBLUR + 'px) hue-rotate(' + BASEHUE + 'deg)';
	addPrefixes("filter", "#guessImg", new_hue);
}

function hueReduction() {
	if (hue != 0 || blur != 0) {
		if (blur != 0) {
			blur -= 0.5;
		}
		if (hue != 0) {
			hue -= 5;
		}
		var new_hue = 'blur(' + blur + 'px) hue-rotate(' + hue + 'deg)';
		addPrefixes("filter", "#guessImg", new_hue);
	} else {
		clearInterval(hue_interval);
	}
}

function addFilter(image) {
	var new_styling;
	if (difficulty == "easy") {
		new_styling = 'blur(' + BASEBLUR + 'px)';
	} else if (difficulty == "medium") {
		new_styling = 'blur(' + BASEBLUR + 'px) hue-rotate(' + BASEHUE + 'deg)';
	} else {
		new_styling = 'blur(' + BASEBLUR + 'px) grayscale(' + BASEGRAYSCALE + ')';
	}
	addPrefixes("filter", "#guessImg", new_styling);
}