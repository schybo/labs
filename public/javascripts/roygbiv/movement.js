//Moves the silver orb when clicked on
function move () {
	//Can only get points and move the orb if pause is off
	if (pause_on != true) {
		var silver_orb = $("#pulse");
		var so_pos = silver_orb.position();

		//Adds points to the score for clicking the orb
		new_points = Math.floor(5 * MULTIPLIER);
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

//Moves each of the enemies randomly
function move_enemy() {

	//For each of the bad guys
	for( var j=0; j < ENEMIES; j++ ) {
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

//Moves the hero bases on user input
function move_hero() {
  //Gets the hero element by ID
  var hero = $( "#hero" );

  //Gets the hero position
  var hero_position = hero.position();

  var left_boundary = 0;
  var right_boundary = size.width - HEROSIZE;
  var top_boundary = 0;
  var bottom_boundary = size.height - HEROSIZE;

  //Simple process flow based on keyboard input
  //Why do I even set a vlaue here if its at the border
  if (rightKey) {
  	if ((hero_position.left + MOVEMENT) >= right_boundary) {
  		$(hero).css({'left': right_boundary + 'px'});
  	} else {
  		$(hero).css({'left': hero_position.left + MOVEMENT + 'px'});
  	}
  } else if (leftKey) {
  	if ((hero_position.left - MOVEMENT) <= left_boundary) {
  		$(hero).css({'left': left_boundary + 'px'});
  	} else {
  		$(hero).css({'left': hero_position.left - MOVEMENT + 'px'});
  	}
  }
  if (upKey) {
  	if ((hero_position.top - MOVEMENT) <= top_boundary) {
  		$(hero).css({'top': top_boundary + 'px'});
  	} else {
  		$(hero).css({'top': hero_position.top - MOVEMENT + 'px'});
  	}
  } else if (downKey) {
  	if ((hero_position.top + MOVEMENT) >= bottom_boundary) {
  		$(hero).css({'top': bottom_boundary + 'px'});
  	} else {
  		$(hero).css({'top': hero_position.top + MOVEMENT + 'px'});
  	}
  }

  //Version 2
  /*if (passes >= 5) {
  	shootBullet(hero_position.left, hero_position.top);
  	passes = 0;
  } else {
  	passes++;
  }*/

  //Checks to see if the hero overlaps with any other divs
  showOverlap();
}

//Special snitch orb
//Don't call this if it has disappeared!!!
function move_snitch()
{
  var rpos = randomPosition();

  var div = document.getElementById('snitch');
  div.style.left = rpos[0] + 'px';
  div.style.top = rpos[1] + 'px';

}