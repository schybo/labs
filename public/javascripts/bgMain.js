//Box stuff
$( "#show-front" ).on( "click", function () {
	$("#cube").attr("class", "show-front");
});

$( "#show-back" ).on( "click", function () {
	$("#cube").attr("class", "show-back");
});

$( "#show-right" ).on( "click", function () {
	$("#cube").attr("class", "show-right");
});

$( "#show-left" ).on( "click", function () {
	$("#cube").attr("class", "show-left");
});

$( "#show-top" ).on( "click", function () {
	$("#cube").attr("class", "show-top");
});

$( "#show-bottom" ).on( "click", function () {
	$("#cube").attr("class", "show-bottom");
});

//Amount to increase time by if the user is correct
var increase = 3;

//Amount to decrease time by if the user is incorrect
var decrease = 12;

//Fix 4, east, left

var answer;
var option2;
var option3;
var option4;

//The ans img location
//var ans_img = "/images/bg_pics/butterfly.jpg";
var ans_img = "https://s3.amazonaws.com/labs.schybo.com.blur/blurPhotos/"
var ans_loc;

var blur_interval;
var base_blur = 30;
var base_grayscale = 1;
var base_hue = 180;

var blur = base_blur;
var grayscale = base_grayscale;
var hue = base_hue;

var difficulty;

var num_options = 4;
var places = [1, 2, 3, 4];

function addPrefixesFilter(image, styling) {
	image.css('-webkit-filter', styling);
	image.css('-moz-filter', styling);
	image.css('-ms-filter', styling);
	image.css('-o-filter', styling);
	image.css('filter', styling);
}

function blurReduction () {
	if (blur != 0) {
		var image = $("#guessImg");
		blur-= 0.5;
		var new_blur = 'blur(' + blur + 'px)';
		addPrefixesFilter(image, new_blur);
	} else {
		clearInterval(blur_interval);
	}
}

function resetGrayscale() {
	var image = $("#guessImg");
	var new_grayscale = 'blur(' + base_blur + 'px) grayscale(' + base_grayscale + ')';
	addPrefixesFilter(image, new_grayscale);
}

function grayscaleReduction () {
	if (grayscale != 0 || blur != 0) {
		var image = $("#guessImg");
		if (blur != 0) {
			blur -= 0.5;
		}
		if (grayscale != 0) {
			base_graysclae -= 0.05;
		}
		var new_grayscale = 'blur(' + blur + 'px) grayscale(' + grayscale + ')';
		addPrefixesFilter(image, new_grayscale);
	} else {
		clearInterval(grayscale_interval);
	}
}

function resetHue() {
	var image = $("#guessImg");
	var new_hue = 'blur(' + base_blur + 'px) hue-rotate(' + base_hue + 'deg)';
	addPrefixesFilter(image, new_hue);
}

function hueReduction() {
	if (hue != 0 || blur != 0) {
		var image = $("#guessImg");
		if (blur != 0) {
			blur -= 0.5;
		}
		if (hue != 0) {
			hue -= 5;
		}
		var new_hue = 'blur(' + blur + 'px) hue-rotate(' + hue + 'deg)';
		addPrefixesFilter(image, new_hue);
	} else {
		clearInterval(hue_interval);
	}
}

//Onload function
jQuery(window).load(function () {
	setTimeout(function () {
		$(".loading-screen").fadeOut("slow");
		//Pauses the game until the menus
		pause_game();
	  	$('#launch').modal('show');

	    //init_quick();
	    //Launch the launching modal
		//The player will either launch init_quick() or quick()
		//$('#bgLaunch').modal('show');

	}, 1000);
});

//Indicates whether the snitch is currently alive
var snitch_alive = false;

//The score
var score = 0;
document.getElementById("score").innerHTML=score;

//Indicates whether pause is on (and it's paused until the end of intro)
var pause_on = true;

//The width & height of the screen
var size = {
  //width: (window.innerWidth - 20) || (document.body.clientWidth - 20),
  width: 1100,
  //height: (window.innerHeight - 20) || (document.body.clientHeight - 20)
  height: 550
}

//Keypress boolean variables
var rightKey = false;
var leftKey = false;
var upKey = false;
var downKey = false;
var spaceBar = false;

//The initial_img
var initial_img;

//The number of seconds
var count=30;

//The number of miliseconds
var hund_count=100;

//Needed so that they're global
var counter;
var counter_hund;

//Sets the timer for the introduction
document.getElementById("timer").innerHTML=60 + ".";
document.getElementById("timer_hund").innerHTML='00';

//var routes = require('../../../routes/index');

function bgMusicOff (changeIcon) {
	document.getElementById("bg-music").pause();
	if (changeIcon) {
		$( "#mute" ).hide();
		$( "#loud" ).show();
	}
}

function bgMusicOn (changeIcon) {
	document.getElementById("bg-music").play();
	if (changeIcon) {
		$( "#loud" ).hide();
		$( "#mute" ).show();
	}
}

function bgWalkthrough() {
	/*alert('cool');
	$('#bgLaunch').foundation('reveal', 'close');
	init_quick(difficulty);*/
	//$('#walkthrough').foundation('reveal', 'open');
}

$("#easy").on("click", function() {
	$('#launch').modal('hide');
	difficulty = "easy";
	init_quick();
})

$("#medium").on("click", function() {
	$('#launch').modal('hide');
	difficulty = "medium";
	init_quick();
})

$("#hard").on("click", function() {
	$('#launch').modal('hide');
	difficulty = "hard";
	init_quick();
})

function transformFactory (element, trans1) {
	//Could make an array of prefixes and cycle through it by hey
	$(element).css('-webkit-transform', trans1);
	$(element).css('-moz-transform', trans1);
	$(element).css('-ms-transform', trans1);
	$(element).css('-o-transform', trans1);
	$(element).css('transform', trans1);
}

function getPhotoInfo() {
	//If only use it once be sure to switch it to this
	//Make the AJAX calls run synchronously so the code doesn't get ahead of the call
	jQuery.ajaxSetup({async:false});

	var photo_info;
	$.get("/photo", function(photo) {
		photo_info = photo;
	    //alert(photo_name);
	})

	//Reset the AJAX calls to async
	jQuery.ajaxSetup({async:true});
	//Should have array instead of four options

	return photo_info;
}

function addFilter(image) {
	var new_styling;
	if (difficulty == "easy") {
		new_styling = 'blur(' + base_blur + 'px)';
	} else if (difficulty == "medium") {
		new_styling = 'blur(' + base_blur + 'px) hue-rotate(' + base_hue + 'deg)';
	} else {
		new_styling = 'blur(' + base_blur + 'px) grayscale(' + base_hue + ')';
	}
	addPrefixesFilter(image, new_styling);
}

function createAnsImg (img_position, img_name) {
	//Will have to remove last image somewhere
	//Call function at correct
	var back_div = document.createElement("div");
	back_div.id = "next_img";
	back_div.className += 'face back';

	$("#card").append(back_div);

	//Creates the image url
	var img_url = ans_img + img_name + '.jpg';

	//Adds the next image to the div, we will have to remove the previous img
	var elem = document.createElement("img");
	elem.id = 'guess2Img';
	elem.src = img_url;

	//document.getElementById("next_img").appendChild(elem);
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
	var img_url = ans_img + initial_img.hash + '.jpg';

	//Adds the next image to the div, we will have to remove the previous img
	var elem = document.createElement("img");
	elem.id = 'guessImg';
	elem.src = img_url;

	var image = $("#guessImg");
	addFilter(image);

	//document.getElementById("next_img").appendChild(elem);
	$(".front").append(elem);
}

function placeOptions() {

	//Get the url of the photo to use next
	if (initial_img == false) {
		var img_info = getPhotoInfo();
	} else {
		answer = initial_img.name;
		option2 = initial_img.option1;
		option3 = initial_img.option2;
		option4 = initial_img.option3;
		initial_img = false;
		var img_info = getPhotoInfo();
	}

	var array_option = num_options;

	var ans_arr_loc = Math.floor(Math.random() * array_option);
	ans_loc = places[ans_arr_loc];
	array_option--;
	places.splice(ans_arr_loc,1);

	var opt2_arr_loc = Math.floor(Math.random() * array_option);
	var opt2_loc = places[opt2_arr_loc];
	array_option--;
	places.splice(opt2_arr_loc,1);

	var opt3_arr_loc = Math.floor(Math.random() * array_option);
	var opt3_loc = places[opt3_arr_loc];
	array_option--;
	places.splice(opt3_arr_loc,1);

	var opt4_loc = places[0];
	places.splice(0,1);
	places = [1,2,3,4];

	createAnsImg(ans_loc, img_info.hash);

	if (ans_loc == 4) {
		$(".vertical-row1").html(answer);
		if (opt2_loc == 3) {
			$(".row4").html(option2);
			if (opt3_loc == 2) {
				$(".vertical-row2").html(option3);
				$(".row2").html(option4);
			} else {
				$(".vertical-row2").html(option4);
				$(".row2").html(option3);
			}
		} else if (opt2_loc == 2) {
			$(".vertical-row2").html(option2);
			if (opt3_loc == 3) {
				$(".row2").html(option4);
				$(".row4").html(option3);
			} else {
				$(".row2").html(option3);
				$(".row4").html(option4);
			}
		//Seems to get an error on this use case
		} else {
			$(".row2").html(option2);
			if (opt3_loc == 3) {
				$(".row4").html(option3);
				$(".vertical-row2").html(option4);
			} else {
				$(".row4").html(option4);
				$(".vertical-row2").html(option3);
			}
		}


	} else if (ans_loc == 3) {
		$(".row4").html(answer);
		if (opt2_loc == 4) {
			$(".vertical-row1").html(option2);
			if (opt3_loc == 2) {
				$(".vertical-row2").html(option3);
				$(".row2").html(option4);
			} else {
				$(".vertical-row2").html(option4);
				$(".row2").html(option3);
			}
		} else if (opt2_loc == 2) {
			$(".vertical-row2").html(option2);
			if (opt3_loc == 4) {
				$(".row2").html(option4);
				$(".vertical-row1").html(option3);
			} else {
				$(".row2").html(option3);
				$(".vertical-row1").html(option4);
			}
		} else {
			$(".row2").html(option2);
			if (opt3_loc == 4) {
				$(".vertical-row1").html(option3);
				$(".vertical-row2").html(option4);
			} else {
				$(".vertical-row1").html(option4);
				$(".vertical-row2").html(option3);
			}
		}


	} else if (ans_loc == 2) {
		$(".vertical-row2").html(answer);
		if (opt2_loc == 4) {
			$(".vertical-row1").html(option2);
			if (opt3_loc == 3) {
				$(".row2").html(option4);
				$(".row4").html(option3);
			} else {
				$(".row2").html(option3);
				$(".row4").html(option4);
			}
		} else if (opt2_loc == 3) {
			$(".row4").html(option2);
			if (opt3_loc == 4) {
				$(".vertical-row1").html(option3);
				$(".row2").html(option4);
			} else {
				$(".vertical-row1").html(option4);
				$(".row2").html(option3);
			}
		} else {
			$(".row2").html(option2);
			if (opt3_loc == 4) {
				$(".vertical-row1").html(option3);
				$(".row4").html(option4);
			} else {
				$(".vertical-row1").html(option4);
				$(".row4").html(option3);
			}
		}


	} else {
		$(".row2").html(answer);
		if (opt2_loc == 4) {
			$(".vertical-row1").html(option2);
			if (opt3_loc == 3) {
				$(".vertical-row2").html(option4);
				$(".row4").html(option3);
			} else {
				$(".vertical-row2").html(option3);
				$(".row4").html(option4);
			}
		} else if (opt2_loc == 3) {
			$(".row4").html(option2);
			if (opt3_loc == 4) {
				$(".vertical-row2").html(option4);
				$(".vertical-row1").html(option3);
			} else {
				$(".vertical-row2").html(option3);
				$(".vertical-row1").html(option4);
			}
		} else {
			$(".vertical-row2").html(option2);
			if (opt3_loc == 3) {
				$(".vertical-row1").html(option4);
				$(".row4").html(option3);
			} else {
				$(".vertical-row1").html(option3);
				$(".row4").html(option4);
			}
		}
	}

	answer = img_info.name;
	option2 = img_info.option1;
	option3 = img_info.option2;
	option4 = img_info.option3;
}

//The seconds timer
function timer() {
  //Goes down by one second each time
  count=count-1;
  document.getElementById("timer").innerHTML=count + ".";

  //If there are less than 5 seconds left then the timer goes red
  //and sound effects play at the end of each second
  if (count <= 4) {
  	document.getElementById("time_down").play();
  	var timer_div = document.getElementById('timer_style');
  	timer_div.style.color = "red";
  	timer_div.style.textShadow = '0px 0px 5px rgba(131, 36, 37, 0.7)';
  	timer_div.style.moztextShadow = '0px 0px 5px rgba(131, 36, 37, 0.7);';
	timer_div.style.webkitextShadow = '0px 0px 5px rgba(131, 36, 37, 0.7);';
  }

  //If the timer reaches zero then the clock stops
  if (count <= 0)
  {
     clearInterval(counter);
     document.getElementById("time_down").play();
  }

}

function hund_timer() {
  //Decreases the hundred second timer by one
  hund_count=hund_count-1;
  document.getElementById("timer_hund").innerHTML=hund_count; // watch for spelling
  
  if (hund_count <= 0) {
  	 //If the second timer is out as wellthen pauses the game and brings end game menu
     if (count<=0) {
     	pause_game();
     	//addHighScore('Brent', score);
		$('#gameOver').modal('show');
		//document.getElementById('replay').focus(); //not working
	 //Else sets the counter back to 100;
     } else {
     	hund_count=100;
     }
  }
}

//Stops just the clock intervals
function stopClock() {
	clearInterval(counter_hund);
    clearInterval(counter);
}

//Resumes the clock
function resumeClock() {
	//So that the clock starts right away and not just after a second
	timer();
	hund_timer();

	//1000 will  run it every 1 second
	counter=setInterval(timer, 1000); 

	//1000 will  run it every 100th of a second
	counter_hund=setInterval(hund_timer, 10);
}

//Increases the level
function levelUp() {

	//Resets the clock
	//Should have a constant for this
    count = 30;
	hund_count = 100;

	//Resumes the clock
	resumeClock();
}

function play_game() {
	//Plays the background movement
	//bgMusicOn(true);

	//If we need to change the icon then do so
	/*if (changeIcon) {
		$( "#pause" ).show();
		$( "#play" ).hide();
	}*/

	//Resumes the clock
	resumeClock();

	//Indicates the game is not paused
	pause_on = false;

	//Start the blur reduction
	if (difficulty == "easy") {
		blur_interval = setInterval(blurReduction, 250);
	} else if (difficulty == "medium") {
		resetHue();
		hue_interval = setInterval(hueReduction, 250);
	} else {
		resetGrayscale();
		grayscale_interval = setInterval(grayscaleReduction, 250);
	}
}

function pause_game() {
	//Pauses background music
	//bgMusicOff(true);

	//Indicates that the pause is on
	pause_on = true;

	//If we need to change the icon then do so
	/*if (changeIcon) {
		$( "#pause" ).hide();
		$( "#play" ).show();
	}*/

	//Stops the clock and clears interavals
	stopClock();

	clearInterval(blur_interval);
}

function restart() {
	initial_img = getPhotoInfo();

	getInitialImg();
	placeOptions();

	$('#gameOver').modal('hide');
	//$('#highScores-test').foundation('reveal', 'close');
	score = 0;
	document.getElementById("score").innerHTML=score;
	count = 30;
	hund_count = 100;
	document.getElementById("timer").innerHTML=count + ".";
	document.getElementById("timer_hund").innerHTML='00';

	play_game();
}

function correct() {
	//Add a point and time to the clock
	score++;
	//Score Effect
	document.getElementById("score").innerHTML=score;
	count+=increase;
	//Reset the blur (plus 1 for the second transition)
	blur = 31;
	hue = 180;
	grayscale = 1;
}

function keyPress(key) {
	var arrow = '#' + key;
	$(arrow).css('color', 'red');
	setTimeout(function () {
		$(arrow).css('color', 'black');
	}, 150);
	
	if ((key == 'left') && (ans_loc == 4)) {
		correct();

		//transformFactory("#card", 'rotateY(-180deg)');
		
		setTimeout(function () {
			//Remove the front div
			$(".back").fadeIn();
			$(".front").fadeOut();
			$(".front").remove();
			//Give the new icon blur
			$('#guess2Img').attr('id', 'guessImg');
			//Remove the back class and add the front class 
			$("#next_img").removeClass("back");
			$("#next_img").addClass("front");

			//Remove the next img id from the 
			$('#next_img').removeAttr('id');

			//Create next image and place options needed now
			placeOptions();
		}, 500);

	} else if ((key == 'bottom') && (ans_loc == 3)) {
		correct();

		//transformFactory("#card", 'rotateX(-180deg)');
		
		setTimeout(function () {
			//Remove the front div
			$(".back").fadeIn();
			$(".front").fadeOut();
			$(".front").remove();
			//Give the new icon blur
			$('#guess2Img').attr('id', 'guessImg');
			//Remove the back class and add the front class 
			$("#next_img").removeClass("back");
			$("#next_img").addClass("front");

			//Remove the next img id from the 
			$('#next_img').removeAttr('id');

			//Create next image and place options needed now
			placeOptions();
		}, 500);

	} else if ((key == 'right') && (ans_loc == 2)) {
		correct();

		//transformFactory("#card", 'rotateY(180deg)');
		
		setTimeout(function () {
			//Remove the front div
			$(".back").fadeIn();
			$(".front").fadeOut();
			$(".front").remove();

			//Give the new icon blur
			$('#guess2Img').attr('id', 'guessImg');

			//Remove the back class and add the front class 
			$("#next_img").removeClass("back");
			$("#next_img").addClass("front");

			//Remove the next img id from the 
			$('#next_img').removeAttr('id');

			//Create next image and place options needed now
			placeOptions();
		}, 500);

	} else if ((key == 'top') && (ans_loc == 1)) {
		correct();

		//Might be better just to have classes that you can have with the specific transformations
		//transformFactory("#card", 'rotateX(180deg)');
		
		setTimeout(function () {
			//Remove the front div
			$(".back").fadeIn("slow");
			$(".front").fadeOut("slow");
			$(".front").remove();
			//Give the new icon blur
			$('#guess2Img').attr('id', 'guessImg');
			//Remove the back class and add the front class 
			$("#next_img").removeClass("back");
			$("#next_img").addClass("front");

			//Remove the next img id from the 
			$('#next_img').removeAttr('id');

			//Create next image and place options needed now
			placeOptions();
		}, 500);

	//If they are incorrect in their guess
	} else {
		count-=decrease;
	}
}


function onKeyDown(evt) {
  //Changes boolean variable to true if key is pressed
  if (evt.keyCode == 39) { 
  	rightKey = true;
  	keyPress('right');
  }
  if (evt.keyCode == 37) {
  	leftKey = true;
  	keyPress('left');
  } 
  if (evt.keyCode == 38) {
  	upKey = true;
  	keyPress('top');
  }
  if (evt.keyCode == 40) {
  	downKey = true;
  	keyPress('bottom');
  }

  //Pauses game if space bar is pressed
  if (evt.keyCode == 32) {
  	var pause_state = $( "#pause" ).css("display");
  	if (pause_on != true) {
  		pause_game(true);
  	} else {
  		play_game(true);
  	}
  	spaceBar = true;
  }
}

//Eats the key so it doesn't move down
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

//Turns boolean variable off if key is released
function onKeyUp(evt) {
  if (evt.keyCode == 39) rightKey = false;
  else if (evt.keyCode == 37) leftKey = false;
  if (evt.keyCode == 38) upKey = false;
  else if (evt.keyCode == 40) downKey = false;
  if (evt.keyCode == 32) spaceBar = false;
}

//Listening for key strokes
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function init() {

	//The introduction
	//May not want to change icon here
  	introJs().setOption('showButtons', false).oncomplete(play_game).onexit(play_game).start();
}

function init_quick() {
	initial_img = getPhotoInfo();

	getInitialImg();
	placeOptions();
	//plays the games
	play_game();
}
//}