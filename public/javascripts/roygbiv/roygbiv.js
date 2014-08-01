//Onload function
jQuery(window).load(function () {
	setTimeout(function () {

		//Sets the timer for the introduction
		document.getElementById("timer").innerHTML=60 + ".";
		document.getElementById("timer_hund").innerHTML='00';
		document.getElementById("score").innerHTML=score;

		//Checks for user input to move the hero
		inv_hero=setInterval(move_hero, 15);

		$(".loading-screen").fadeOut("slow");


		//Pauses the game until the menus
		pause_game();

		//Launch the launching modal
		$('#launch').modal('show');
	}, 1000);
});

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
		new_points = Math.floor(10 * MULTIPLIER);
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
		new_points = Math.floor((l + 1) * MULTIPLIER);
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
		$('#gameOver').modal('show');
		document.getElementById('replay').focus();
	}
}