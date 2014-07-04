//Create loading screen
//Bug on occasion when answer doesn't show

//Fix 4, east, left

var answer = 'butterfly';
var option2 = 'bear';
var option3 = 'women';
var option4 = "chair"; 

//The ans img location
var ans_img = "/images/bg_pics/butterfly.jpg";
var ans_loc;

var blur_interval;
var base_blur = 30;

var num_options = 4;
var places = [1, 2, 3, 4];

function blurReduction () {
	if (base_blur != 0) {
		var image = $("#guessImg");
		base_blur-= 0.5;
		var new_blur = 'blur(' + base_blur + 'px)';
		image.css('-webkit-filter', new_blur);
		image.css('-moz-filter', new_blur);
		image.css('-ms-filter', new_blur);
		image.css('filter', new_blur);
	} else {
		clearInterval(blur_interval);
	}
}

//Onload function
jQuery(window).load(function () {
	//Turn on reveal which is currently not working
  	$(document).foundation({
  		close_on_background_click: false
	});

	//Pauses the game until the menus
	pause_game();

    init_quick();
    //$(".loading-screen").remove();
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

//The number of seconds
var count=60;

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

function transformFactory (element, trans1) {
	//Could make an array of prefixes and cycle through it by hey
	$(element).css('-webkit-transform', trans1);
	$(element).css('-moz-transform', trans1);
	$(element).css('-ms-transform', trans1);
	$(element).css('-o-transform', trans1);
	$(element).css('transform', trans1);
}

function createAnsImg (img_position) {
	//Will have to remove last image somewhere
	//Call function at correct
	var back_div = document.createElement("div");
	back_div.id = "next_img";
	back_div.className += 'face back';

	$("#card").append(back_div);

	//Adds the next image to the div, we will have to remove the previous img
	var elem = document.createElement("img");
	elem.id = 'guess2_img';
	elem.src = ans_img;

	//document.getElementById("next_img").appendChild(elem);
	$(".back").append(elem);

	$(".back").css('display', 'none');
	//Go through to check the position of the answer so we can have the correct transformation
	//Moves the image into position
	//We apply the other transformation on key press
	/*if (img_position == 4) {
		transformFactory(".back", 'rotateY(180deg)');
	} else if (img_position == 3) {
		transformFactory(".back", 'rotateX(180deg)');
	} else if (img_position == 2) {
		transformFactory(".back", 'rotateY(-180deg)');
	} else {
		transformFactory(".back", 'rotateX(-180deg)');
	}*/
}

function placeOptions() {
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

	createAnsImg(ans_loc);

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
		$('#myModal').foundation('reveal', 'open');
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
    count = 60;
	hund_count = 100;

	//Resumes the clock
	resumeClock();
}

function play_game(changeIcon) {
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
	blur_interval = setInterval(blurReduction, 250); 
}

function pause_game(changeIcon) {
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
}

function keyPress(key) {
	var arrow = '#' + key;
	$(arrow).css('color', 'red');
	setTimeout(function () {
		$(arrow).css('color', 'black');
	}, 150);
	
	if ((key == 'left') && (ans_loc == 4)) {
		//Add a point and time to the clock
		score++;
		//score effect
		document.getElementById("score").innerHTML=score;
		count+=10;

		//transformFactory("#card", 'rotateY(-180deg)');
		
		setTimeout(function () {
			//Remove the front div
			$(".back").fadeIn();
			$(".front").fadeOut();
			$(".front").remove();
			//Give the new icon blur
			$('#guess2_img').attr('id', 'guessImg');
			//Remove the back class and add the front class 
			$("#next_img").removeClass("back");
			$("#next_img").addClass("front");

			//Remove the next img id from the 
			$('#next_img').removeAttr('id');

			//Create next image and place options needed now
			placeOptions();
		}, 500);

	} else if ((key == 'bottom') && (ans_loc == 3)) {
		score++;
		document.getElementById("score").innerHTML=score;
		count+=10;

		//transformFactory("#card", 'rotateX(-180deg)');
		
		setTimeout(function () {
			//Remove the front div
			$(".back").fadeIn();
			$(".front").fadeOut();
			$(".front").remove();
			//Give the new icon blur
			$('#guess2_img').attr('id', 'guessImg');
			//Remove the back class and add the front class 
			$("#next_img").removeClass("back");
			$("#next_img").addClass("front");

			//Remove the next img id from the 
			$('#next_img').removeAttr('id');

			//Create next image and place options needed now
			placeOptions();
		}, 500);

	} else if ((key == 'right') && (ans_loc == 2)) {
		score++;
		document.getElementById("score").innerHTML=score;
		count+=10;

		//transformFactory("#card", 'rotateY(180deg)');
		
		setTimeout(function () {
			//Remove the front div
			$(".back").fadeIn();
			$(".front").fadeOut();
			$(".front").remove();

			//Give the new icon blur
			$('#guess2_img').attr('id', 'guessImg');

			//Remove the back class and add the front class 
			$("#next_img").removeClass("back");
			$("#next_img").addClass("front");

			//Remove the next img id from the 
			$('#next_img').removeAttr('id');

			//Create next image and place options needed now
			placeOptions();
		}, 500);

	} else if ((key == 'top') && (ans_loc == 1)) {
		score++;
		document.getElementById("score").innerHTML=score;
		count+=10;

		//Might be better just to have classes that you can have with the specific transformations
		//transformFactory("#card", 'rotateX(180deg)');
		
		setTimeout(function () {
			//Remove the front div
			$(".back").fadeIn("slow");
			$(".front").fadeOut("slow");
			$(".front").remove();
			//Give the new icon blur
			$('#guess2_img').attr('id', 'guessImg');
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
		count-=10;
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

	placeOptions();

	//plays the games
	play_game();
}
//}