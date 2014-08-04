//Onload function
jQuery(window).load(function () {
	setTimeout(function () {

		//Fill in the score
		document.getElementById("score").innerHTML=score;
		//Sets the timer for the introduction
		document.getElementById("timer").innerHTML=60 + ".";
		document.getElementById("timer_hund").innerHTML='00';

		//Fade the loading screen out
		$(".loading-screen").fadeOut("slow");

		//Pauses the game until the menus
		pause_game();

		//Show the launch modal
	  	$('#launch').modal('show');


	}, 1000);
});

function getPhotoInfo() {
	//If only use it once be sure to switch it to this
	//Make the AJAX calls run synchronously so the code doesn't get ahead of the call
	jQuery.ajaxSetup({async:false});

	var photo_info;
	$.get("/photo", function(photo) {
		photo_info = photo;
	})

	//Reset the AJAX calls to async
	jQuery.ajaxSetup({async:true});
	//Should have array instead of four options

	return photo_info;
}

function createAnsImg (img_position, img_name) {
	//Will have to remove last image somewhere
	//Call function at correct
	var back_div = document.createElement("div");
	back_div.id = "next_img";
	back_div.className += 'face back';

	$("#card").append(back_div);

	//Creates the image url
	var img_url = ANSIMG + img_name + '.jpg';

	//Adds the next image to the div, we will have to remove the previous img
	var elem = document.createElement("img");
	elem.id = 'guess2Img';
	elem.src = img_url;

	$(".back").append(elem);

	var image = $("#guess2Img");
	addFilter(image);

	$(".back").css('display', 'none');
}

function getInitialImg() {
	var front_div = document.createElement("div");
	front_div.className += 'front face';

	$("#card").append(front_div);

	//Creates the image url
	var img_url = ANSIMG + initial_img.hash + '.jpg';

	//Adds the next image to the div, we will have to remove the previous img
	var elem = document.createElement("img");
	elem.id = 'guessImg';
	elem.src = img_url;

	var image = $("#guessImg");
	addFilter(image);

	$(".front").append(elem);
}

function correct() {
	//Add a point and time to the clock
	//score++;
	if (difficulty == "easy") {
		score += (BASESCORE * EASYMULT * time_mult);
	} else if (difficulty == "medium") {
		score += (BASESCORE * MEDMULT * time_mult);
	} else {
		score += (BASESCORE * HARDMULT * time_mult);
	}

	document.getElementById("score").innerHTML=score;
	count+=INCREASE;
	//Resets the time multiplier
	time_mult = 36;

	//Reset the blur (plus 1 for the second transition)
	blur = BASEBLUR;
	hue = BASEHUE;
	grayscale = BASEGRAYSCALE;
}