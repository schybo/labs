//BUGS
//=================
//Fix timing issue
//Fix reveal
//May not want to have pause on when intro
//Hero can go out of screen
//Have timer, pause, and score off limits by elements
//Get focus on replay button at end
//Glitch collsion with enemey and snitch something happens
//Loads next level when there are still two nuggets left

//Features
//================
//Time bonus
//Time goes down at end of each level if levels?
//Should have option to turn off sound effects too
//Maybe gettings snitch increases your time?

//Link to the high score schema
//var HighScoreSchema = require('../../../schemas/kleptomania');
//module.exports =function () {
//The number of enemies at the start
var num_nuggets = 1;

//The number of enemies at the start
var num_enemies = 3;

//The number of enemies left on the screen
var nuggets_left = num_nuggets;

//The score multiplier
var scoreMult = 1.5;

//Indicates whether the snitch is currently alive
var snitch_alive = false;

//The score
var score = 0;
document.getElementById("score").innerHTML=score;

//Indicates whether pause is on (and it's paused until the end of intro)
var pause_on = true;

//The width & height of the screen
var size = {
  width: (window.innerWidth - 20) || (document.body.clientWidth - 20),
  height: (window.innerHeight - 20) || (document.body.clientHeight - 20)
}

//var routes = require('../../../routes/index');

//The size of the hero
/*var heroSize = {
	width: 16
	height: 16
}*/

/*function addHighScore(username, score) {
	alert('here');
	var mongoose = require('mongoose');
	alert('here');

	var HighScoreSchema = mongoose.model('HighScore', {
		username: username,
		score: score
	});
	alert('here');

	var record = new HighScoreSchema(
		{
			"username": username,
			"score": score
		}
	);
	alert('here');
	record.save();
}*/

//Checks the size of the screen and then returns a random position inside there
function randomPosition () {	
	// First get the size from the window
	// if that didn't work, get it from the body
	var nw = Math.floor((Math.random() * size.width) + 1);
	var nh = Math.floor((Math.random() * size.height) + 1);

	return [nw, nh];
}

//Moves the silver orb when clicked on
function move () {
	//Can only get points and move the orb if pause is off
	if (pause_on != true) {
		//Adds points to the score for clicking the orb
		score = Math.floor((score + 2) * scoreMult);
		document.getElementById("score").innerHTML=score;

		var rpos = randomPosition();

		//Calculates a random hex color (thanks Paul Irish)
		var rand_color = '#'+Math.floor(Math.random()*16777215).toString(16);

		//Moves the div
		var div = document.getElementById('pulse');
		div.style.left = rpos[0] + 'px';
		div.style.top = rpos[1] + 'px';
	}
}

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

//Creates the nuggets for the game
//Gets called at the start of the game and at the start of each new level
function createNugget() {

	//Creates the number of nuggets required by the level
	for( var j=0; j < num_nuggets; j++ ) {
		//Gets a random position on the screen
		var rpos = randomPosition();

		//Creates the nugget div
		var rand_color = '#'+Math.floor(Math.random()*16777215).toString(16);
		var div = document.createElement("div");
		div.style.left = rpos[0] + 'px';
		div.style.top = rpos[1] + 'px';
		div.style.background = rand_color;
		div.className += 'nugget';

		document.body.appendChild(div);
	}

	//If snitch is not alive then creates it
	if (!snitch_alive) {
		//Gets a random position
		var rpos = randomPosition();

		//Creates the snitch class
		var snitch = document.createElement("div");
		snitch.style.left = rpos[0] + 'px';
		snitch.style.top = rpos[1] + 'px';
		snitch.className += 'pulse_marker2';
		snitch.id = 'snitch';
		document.body.appendChild(snitch);

		//Adds the ring to the snitch
		var ring = document.createElement("div");
		ring.className += 'pulse_ring2';
		document.getElementById("snitch").appendChild(ring);

		//Indicates the snitch is now alive
		snitch_alive = true;
	}
}

//Creates the enemy for each game
function createEnemy() {

	//Creates the number of enemies required
	for( var j=0; j < num_enemies; j++ ) {
		//Gets a random position
		var rpos = randomPosition();

		//Creates the enemy div
		var div = document.createElement("div");
		div.style.left = rpos[0] + 'px';
		div.style.top = rpos[1] + 'px';
		div.style.background = '#333333';
		div.className += 'enemy';

		//Gives each badguy a unique id
		div.id = 'badguy' + j;

		document.body.appendChild(div);
	}
}

//Sets the timer for the introduction
document.getElementById("timer").innerHTML=60 + ".";
document.getElementById("timer_hund").innerHTML='00';

//The number of seconds
var count=60;

//The number of miliseconds
var hund_count=100;

//Needed so that they're global
var counter;
var counter_hund;

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

//Moves each of the enemies randomly
function move_enemy() {

	//For each of the bad guys
	for( var j=0; j < num_enemies; j++ ) {
		//Gets one of the bad guys id's
		var badguy_id = '#badguy' + j;

		//Gets a random position
		var rpos = randomPosition();

		//Animates the moement of the badguy over two seconds
		$(badguy_id).animate({ 
			top: rpos[1], left: rpos[0]
		}, 2000);
	}
}

//The interval for the snitch
var move_counter;

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
	//Closes the dropdown
	//$('#levelUp').foundation('reveal', 'close');

	//Increases the score multiplier
	scoreMult = (scoreMult * 1.5);

	//Increases the number of nuggets and sets the number left to that
	num_nuggets = num_nuggets + Math.floor((num_nuggets / 2) + 3);
	nuggets_left = num_nuggets;
	createNugget();

	//Resets the clock
    count = 60;
	hund_count = 100;

	//Resumes the clock
	resumeClock();
	
	//Resumes the collection of user input for hero movement
	inv_hero=setInterval(move_hero, 15);
}


//Moves the hero bases on user input
function move_hero() {
  //Gets the hero element by ID
  var hero = $( "#hero" );

  //Gets the hero position
  var hero_position = hero.position();

  //Simple process flow based on keyboard input
  if (rightKey) {
  	if ((hero_position.left + movement) >= size.width) {
  		$(hero).css({'left': size.width + 'px'});
  	} else {
  		$(hero).css({'left': hero_position.left + movement + 'px'});
  	}
  } else if (leftKey) {
  	if ((hero_position.left - movement) <= 0) {
  		$(hero).css({'left': 0 + 'px'});
  	} else {
  		$(hero).css({'left': hero_position.left - movement + 'px'});
  	}
  }
  if (upKey) {
  	if ((hero_position.top - movement) <= 0) {
  		$(hero).css({'top': 0 + 'px'});
  	} else {
  		$(hero).css({'top': hero_position.top - movement + 'px'});
  	}
  } else if (downKey) {
  	if ((hero_position.top + movement) >= size.height) {
  		$(hero).css({'top': size.height + 'px'});
  	} else {
  		$(hero).css({'top': hero_position.top + movement + 'px'});
  	}
  }

  //Checks to see if the hero overlaps with any other divs
  showOverlap();

  //Used for checking if the users is out of bounds
  //Would be good if we had set width and height
  //if (block_x <= 0) block_x = 0;
  //if ((block_x + block_w) >= WIDTH) block_x = WIDTH - block_w;
  //if (block_y <= 0) block_y = 0;
  //if ((block_y + block_h) >= HEIGHT) block_y = HEIGHT - block_h;
}

//Checks for user input to move the hero
var inv_hero=setInterval(move_hero, 15);

//Global variable for enemy movement
var enemy_movement;

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

	//Moves the snitch after 700 and then again so unpredicatble after pause
	setTimeout(move_snitch, 700);
	move_counter=setInterval(move_snitch, 1000);

	//Moves enemies and ressets the intervals
	move_enemy();
	enemy_movement=setInterval(move_enemy, 2000);

	//Reset hero moement tracker
	inv_hero=setInterval(move_hero, 15);
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
	clearInterval(move_counter);
    clearInterval(inv_hero);

    //Ends enemey animation and clears interval
	$(".enemy").stop();
	clearInterval(enemy_movement);
}



//Special snitch orb
function move_snitch()
{
	var rpos = randomPosition();

	var div = document.getElementById('snitch');
	div.style.left = rpos[0] + 'px';
	div.style.top = rpos[1] + 'px';

	//Styles if you wanted to add transforming via CSS
	/*div.style["-webkit-transform"] = "translate(" + rand_width + "px," + rand_height +"px)";
    div.style["-moz-transform"] = "translate(" + rand_width + "px," + rand_height +"px)";
    div.style["-ms-transform"] = "translate(" + rand_width + "px," + rand_height +"px)";
    div.style["-o-transform"] = "translate(" + rand_width + "px," + rand_height +"px)";
    div.style["transform"] = "translate(" + rand_width + "px," + rand_height +"px)";*/
}

//Not Working
function restart() {

	//Removes the elements from the previous game
	//Except the silver orb
	$(".enemy").remove();
	$("#enemy").remove();
	$(".nugget").remove();

	//Creates new nuggets and snitch
	createNugget();

	//Creates new enemies
	createEnemy();

	$('#myModal').foundation('reveal', 'close');
	score = 0;
	document.getElementById("score").innerHTML=score;
	count = 60;
	hund_count = 100;
	document.getElementById("timer").innerHTML=count + ".";
	document.getElementById("timer_hund").innerHTML='00';

	play_game();
}

//The amount of movement done by the hero
var movement = 5;

//Keypress boolean variables
var rightKey = false;
var leftKey = false;
var upKey = false;
var downKey = false;
var spaceBar = false;

function onKeyDown(evt) {
  //Changes boolean variable to true if key is pressed
  if (evt.keyCode == 39) rightKey = true;
  else if (evt.keyCode == 37) leftKey = true;
  if (evt.keyCode == 38) upKey = true;
  else if (evt.keyCode == 40) downKey = true;

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

//Collision detection
function showOverlap(event,ui) {
	//Collision with the snitch
	var snitch = $("#hero").collision( "#snitch" );
	snitch.remove()
	for( var i=0; i<snitch.length; i++ ) {
		document.getElementById("snitch_sound").play();
		score += Math.floor(10 * scoreMult);	
		document.getElementById("score").innerHTML=score;
		snitch_alive = false;
	}

	//Collision with the nugget (adds points and plays sound)
	var nugget = $("#hero").collision( ".nugget" );
	nugget.remove();
	for( var l=0; l<nugget.length; l++ ) {
		score += Math.floor((l + 1) * scoreMult);
		document.getElementById("pickup-coin").play();	
		document.getElementById("score").innerHTML=score;
		nuggets_left--;

		//If no nuggets are left then offers to increase the level
		//we should increase level automatically
		if (nuggets_left == 0) {
			//$('#levelUp').foundation('reveal', 'open');
			stopClock();
			clearInterval(inv_hero);
			levelUp();
		}
	}
	
	//Collision with enemy (pauses game and indicates game over)
	var enemy_collision = $("#hero").collision( ".enemy" );
	for( var j=0; j<enemy_collision.length; j++ ) {
		document.getElementById("hurt").play();
		pause_game();
		//addHighScore('Brent', 400);
		$('#myModal').foundation('reveal', 'open');
		document.getElementById('replay').focus();
	}
}

function init() {
	//Creates nuggets
	createNugget();

	//Creates enemies
	createEnemy();

	//Pauses the game until the end of the walkthorugh
	pause_game();

	//The introduction
	//May not want to change icon here
  	introJs().setOption('showButtons', false).oncomplete(play_game).onexit(play_game).start();
	
  	//Turn on reveal which is currently not working
  	$(document).foundation({
  		close_on_background_click: false
	});
}
//}