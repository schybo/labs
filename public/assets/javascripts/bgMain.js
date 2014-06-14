//Create loading screen

var blur_interval;
var base_blur = 20;

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

	//Start the blur reduction
	blur_interval = setInterval(blurReduction, 250); 

    //init_quick();
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


//Moves the hero bases on user input
function move_hero() {

  //Simple process flow based on keyboard input
  //Why do I even set a vlaue here if its at the border
  if (rightKey) {
  
  } else if (leftKey) {
  	
  }
  if (upKey) {
  
  } else if (downKey) {
  
  }
}

function play_game(changeIcon) {
	//Plays the background movement
	bgMusicOn(true);

	//If we need to change the icon then do so
	if (changeIcon) {
		$( "#pause" ).show();
		$( "#play" ).hide();
	}

	//Resumes the clock
	resumeClock();

	//Indicates the game is not paused
	pause_on = false;
}

function pause_game(changeIcon) {
	//Pauses background music
	bgMusicOff(true);

	//Indicates that the pause is on
	pause_on = true;

	//If we need to change the icon then do so
	if (changeIcon) {
		$( "#pause" ).hide();
		$( "#play" ).show();
	}

	//Stops the clock and clears interavals
	stopClock();
}

function restart() {
}

function keyPress(key) {
	var arrow = '#' + key;
	$(arrow).css('color', 'red');
	setTimeout(function () {
		$(arrow).css('color', 'black');
	}, 150);
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
  	if (pause_state == "inline") {
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

	//plays the games
	play_game();
}
//}