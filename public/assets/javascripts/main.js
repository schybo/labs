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
// Have silver orb created by javascript


//Create loading screen

//Onload function
jQuery(window).load(function () {
	//Turn on reveal which is currently not working
  	$(document).foundation({
  		close_on_background_click: false
	});

	//Pauses the game until the menus
	pause_game();

	//Launch the launching modal
	//The player will either launch init_quick() or quick()
	$('#launch').foundation('reveal', 'open');

    //init();
    //$(".loading-screen").remove();
});

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
var num_enemies = 0;

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

//Top margin of game board
var top_margin = 100;

//Size of a nugget 
var nugget_size = 16;

//Size of an enemy
var enemy_size = 16;

//Size of the hero
var hero_size = 16;

//The left margin of the game board
var left_margin = parseInt($(".playing-field").css('margin-left'), 10);

//The width & height of the screen
var size = {
  //width: (window.innerWidth - 20) || (document.body.clientWidth - 20),
  width: 1100,
  //height: (window.innerHeight - 20) || (document.body.clientHeight - 20)
  height: 550
}

//The amount of movement done by the hero
var movement = 5;

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

//Checks for user input to move the hero
var inv_hero=setInterval(move_hero, 15);
//var shoot_bullet=setInterval(shootBullet, 100);
var passes = 0;

//Global variable for enemy movement
var enemy_movement;

//Amount of bullets shot
var bullets_shot = 0;

//The last vertical movement key pressed
var last_vmove;

//The last horizontal movement key pressed
var last_hmove;

//How many bad guys should be on the board
var increase_bad_guys = 3;

//The interval for the snitch
var move_counter;

//The timeout for the silver orb
var so_timeout;

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

function walkthrough() {
	$('#launch').foundation('reveal', 'close');
	$('#walkthrough').foundation('reveal', 'open');
}

//Checks the size of the screen and then returns a random position inside there
function randomPosition () {	

	//This will become a problem when elements are different sizes
	var nw = Math.floor((Math.random() * (size.width - nugget_size) + 1)) + left_margin;
	var nh = Math.floor((Math.random() * (size.height - nugget_size) + 1)) + top_margin;

	return [nw, nh];
}

//Moves the silver orb when clicked on
function move () {
	//Can only get points and move the orb if pause is off
	if (pause_on != true) {
		var silver_orb = $("#pulse");
		var so_pos = silver_orb.position();

		//Adds points to the score for clicking the orb
		new_points = Math.floor(5 * scoreMult);
		pointsEffect(so_pos.top, so_pos.left, new_points);
		score += new_points;
		document.getElementById("score").innerHTML=score;

		var rpos = randomPosition();
		var randTime = Math.floor((Math.random()*20000) + 15000);

		//Calculates a random hex color (thanks Paul Irish)
		//var rand_color = '#'+Math.floor(Math.random()*16777215).toString(16);

		function showOrb () {
			silver_orb.show()
		}
		//Moves the div
		silver_orb.hide();
		silver_orb.css('left', rpos[0] + 'px');
		silver_orb.css('top', rpos[1] + 'px');
		so_timeout = setTimeout(showOrb, randTime);
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

/*function bulletChecker(bullet) {
  var bullet = $(bullet);

  //Gets the hero position
  var bullet_position = bullet.position();
  if (bullet_position.left >= size.width) {
  	bullet.remove();
  } else if (bullet_position.top >= size.height) {
	bullet.remove();
  }
}*/

function shootBullet (left, top) {
	//Gets the hero element by ID
	//var hero = $( "#hero" );

	//Gets the hero position
	//var hero_position = hero.position();
	var nw = (size.width - left);
	var nh = (size.height - top);
	//var uniq_id = 'bullet' + bullets_shot;
	//bullets_shot++;

	//Creates the enemy div
	var div = document.createElement("div");
	div.className += 'basic-bullet';
	//div.id = uniq_id;

	document.getElementById("hero").appendChild(div);

	if ((last_hmove == 'right') && (last_vmove == 'up')) {
		if (rightKey && !upKey) {
			$(div).animate({ 
			   left: nw
			}, 1000);
		} else if (!rightKey && upKey) {
			$(div).animate({ 
				top: (-1 * nh)
			}, 1000);
		} else {
			$(div).animate({ 
				top: (-1 * nh), left: nw
			}, 1000);
		}
	} else if ((last_hmove == 'right') && (last_vmove == 'down')) {
		if (rightKey && !downKey) {
			$(div).animate({ 
			   left: nw
			}, 1000);
		} else if (!rightKey && downKey) {
			$(div).animate({ 
				top: nh
			}, 1000);
		} else {
			$(div).animate({ 
				top: nh, left: nw
			}, 1000);
		}
	} else if ((last_hmove == 'left') && (last_vmove == 'up')) {
		if (leftKey && !upKey) {
			$(div).animate({ 
				left: (-1 * nw)
			}, 1000);
		} else if (!leftKey && upKey) {
			$(div).animate({ 
				top: (-1 * nh)
			}, 1000);
		} else {
			$(div).animate({ 
				top: (-1 * nh), left: (-1 * nw)
			}, 1000);
		}
	} else {
		if (leftKey && !downKey) {
			$(div).animate({ 
				left: (-1 * nw)
			}, 1000);
		} else if (!leftKey && downKey) {
			$(div).animate({ 
				top: nh
			}, 1000);
		} else {
			$(div).animate({ 
				top: nh, left: (-1 * nw)
			}, 1000);
		}
	}

	/*$(div).animate({ 
			top: nh, left: nw
	}, 1000);*/

	function remove () {
		$(div).remove();
	}

	//setInterval(bulletChecker(uniq_id), 15);
	setTimeout(remove, 1000);
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
	//if(typeof(num_bad_guys)==='undefined') num_bad_guys = num_enemies;
	//Creates the number of enemies required
	for( num_enemies; num_enemies < increase_bad_guys; num_enemies++ ) {
		//Gets a random position
		var rpos = randomPosition();

		//Creates the enemy div
		var div = document.createElement("div");
		div.style.left = rpos[0] + 'px';
		div.style.top = rpos[1] + 'px';
		div.style.background = '#333333';
		div.className += 'enemy';

		//Gives each badguy a unique id
		div.id = 'badguy' + num_enemies;

		document.body.appendChild(div);
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

	//Change the game board shadow color
	//var rand_color = '#'+Math.floor(Math.random()*16777215).toString(16);
	//$(".playing-field").css('box-shadow', 'inset 0px 0px 6px 0px' + rand_color);

	//Increases the score multiplier
	scoreMult = (scoreMult * 1.5);

	//Increases the number of nuggets and sets the number left to that
	num_nuggets = num_nuggets + Math.floor((num_nuggets / 2) + 3);
	nuggets_left = num_nuggets;
	createNugget();

	//Increase the number of bad_guys
	increase_bad_guys++;
	createEnemy();

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

  var left_boundary = left_margin;
  var right_boundary = size.width + left_margin - hero_size;
  var top_boundary = top_margin;
  var bottom_boundary = size.height + top_margin - hero_size;

  //Simple process flow based on keyboard input
  //Why do I even set a vlaue here if its at the border
  if (rightKey) {
  	if ((hero_position.left + movement) >= right_boundary) {
  		$(hero).css({'left': right_boundary + 'px'});
  	} else {
  		$(hero).css({'left': hero_position.left + movement + 'px'});
  	}
  } else if (leftKey) {
  	if ((hero_position.left - movement) <= left_boundary) {
  		$(hero).css({'left': left_boundary + 'px'});
  	} else {
  		$(hero).css({'left': hero_position.left - movement + 'px'});
  	}
  }
  if (upKey) {
  	if ((hero_position.top - movement) <= top_boundary) {
  		$(hero).css({'top': top_boundary + 'px'});
  	} else {
  		$(hero).css({'top': hero_position.top - movement + 'px'});
  	}
  } else if (downKey) {
  	if ((hero_position.top + movement) >= bottom_boundary) {
  		$(hero).css({'top': bottom_boundary + 'px'});
  	} else {
  		$(hero).css({'top': hero_position.top + movement + 'px'});
  	}
  }

  /*if (passes >= 5) {
  	shootBullet(hero_position.left, hero_position.top);
  	passes = 0;
  } else {
  	passes++;
  }*/

  //Checks to see if the hero overlaps with any other divs
  showOverlap();
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

	//Moves the snitch after 700 and then again so unpredicatble after pause
	setTimeout(move_snitch, 700);
	move_counter=setInterval(move_snitch, 1000);

	//Moves enemies and ressets the intervals
	move_enemy();
	enemy_movement=setInterval(move_enemy, 2000);

	//Reset hero moement tracker
	inv_hero=setInterval(move_hero, 15);
	//shoot_bullet=setInterval(shootBullet, 100);
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
    //clearInterval(shoot_bullet);

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
	num_nuggets = 1;
	num_enemies = 0;
	nuggets_left = num_nuggets;
	increase_bad_guys = 3;

	scoreMult = 1.5;

	clearTimeout(so_timeout);
	$("#pulse").show();

	//Removes the elements from the previous game
	//Except the silver orb
	$(".enemy").remove();
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

function onKeyDown(evt) {
  //Changes boolean variable to true if key is pressed
  if (evt.keyCode == 39) { 
  	rightKey = true;
  	last_hmove = 'right'; 
  } else if (evt.keyCode == 37) {
  	leftKey = true;
  	last_hmove = 'left';
  } 
  if (evt.keyCode == 38) {
  	upKey = true;
  	last_vmove = 'up';
  } else if (evt.keyCode == 40) {
  	downKey = true;
  	last_vmove = 'down';
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

function pointsEffect(ntop, nleft, points) {
	var div = document.createElement("div");
	div.style.left = nleft + 'px';
	div.style.top = ntop + 'px';
	div.innerHTML = "&#43;" + points;
	div.className += 'points-effect';

	document.body.appendChild(div);

	//$(".points-text").html("&#43;10");
	//var pos = $(".points-text").position();

	$( ".points-effect" ).animate({
	    opacity: 0.0,
	    fontSize: "3em",
	    top: ntop - 30 + "px"
	}, 500, function () {
	    $(".points-text").remove();
	});
}

//Collision detection
function showOverlap(event,ui) {
	//Collision with the snitch
	var snitch = $("#hero").collision( "#snitch" );
	var snitch_pos = snitch.position();
	snitch.remove()
	for( var i=0; i<snitch.length; i++ ) {
		document.getElementById("snitch_sound").play();
		new_points = Math.floor(10 * scoreMult);
		score += new_points;	

		//The points effect after capturing a nugget
		pointsEffect(snitch_pos.top, snitch_pos.left, new_points);
		document.getElementById("score").innerHTML=score;
		snitch_alive = false;
	}

	//Collision with the nugget (adds points and plays sound)
	var nugget = $("#hero").collision( ".nugget" );
	var nug_pos = nugget.position();
	nugget.remove();
	for( var l=0; l<nugget.length; l++ ) {
		new_points = Math.floor((l + 1) * scoreMult);
		score += new_points;
		document.getElementById("pickup-coin").play();	
		document.getElementById("score").innerHTML=score;
		nuggets_left--;

		//The points effect after capturing a nugget
		pointsEffect(nug_pos.top, nug_pos.left, new_points);
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
	//Closes the walkthrough dropdown.
	$('#walkthrough').foundation('reveal', 'close');

	//Creates nuggets
	createNugget();

	//Creates enemies
	createEnemy();

	//Pauses the game until the end of the walkthorugh
	//pause_game();

	//The introduction
	//May not want to change icon here
  	introJs().setOption('showButtons', false).oncomplete(play_game).onexit(play_game).start();
}

function init_quick() {
	//Closes the walkthrough dropdown.
	$('#walkthrough').foundation('reveal', 'close');

	//Creates nuggets
	createNugget();

	//Creates enemies
	createEnemy();

	//plays the games
	play_game();
}
//}