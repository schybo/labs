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

//Increases the level
function levelUp() {
	//Increases the score multiplier
	MULTIPLIER = (MULTIPLIER * 1.5);

	//Increases the number of nuggets and sets the number left to that
	NUGGETS = NUGGETS + Math.floor((NUGGETS / 2) + 3);
	nuggets_left = NUGGETS;
	createNugget();

	//Increase the number of bad_guys
	increase_bad_guys++;
	createEnemy();

	//Resets the clock
    count = 60;
	hund_count = 100;

	//Resumes the clock
	resumeClock();
	
	//Resumes the collection of user input for hero MOVEMENT
	inv_hero=setInterval(move_hero, 15);
}

//Checks the size of the screen and then returns a random position inside there
function randomPosition () {	

	//This will become a problem when elements are different sizes
	var nw = Math.floor((Math.random() * (size.width - NUGGETSIZE) + 1)) + left_margin;
	var nh = Math.floor((Math.random() * (size.height - NUGGETSIZE) + 1)) + TOPMARGIN;

	return [nw, nh];
}

function play_game(changeIcon) {
	//Plays the background MOVEMENT
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
	enemy_MOVEMENT=setInterval(move_enemy, 2000);

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
	clearInterval(enemy_MOVEMENT);
}

function restart() {
	NUGGETS = 1;
	ENEMIES = 0;
	nuggets_left = NUGGETS;
	increase_bad_guys = 3;

	MULTIPLIER = 1.5;

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

	//Hide both just in case
	$('#gameOver').modal('hide');
	$('#highScores').modal('hide');
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

function init() {
	//Closes the walkthrough dropdown.
	$('#walkthrough').modal('hide');

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
	$('#walkthrough').modal('hide');

	//Creates nuggets
	createNugget();

	//Creates enemies
	createEnemy();

	//plays the games
	play_game();
}