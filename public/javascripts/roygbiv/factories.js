//Creates the nuggets for the game
//Gets called at the start of the game and at the start of each new level
function createNugget() {

	//Creates the number of nuggets required by the level
	for( var j=0; j < NUGGETS; j++ ) {
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
	//if(typeof(num_bad_guys)==='undefined') num_bad_guys = ENEMIES;
	//Creates the number of enemies required
	for( ENEMIES; ENEMIES < increase_bad_guys; ENEMIES++ ) {
		//Gets a random position
		var rpos = randomPosition();

		//Creates the enemy div
		var div = document.createElement("div");
		div.style.left = rpos[0] + 'px';
		div.style.top = rpos[1] + 'px';
		div.style.background = '#333333';
		div.className += 'enemy';

		//Gives each badguy a unique id
		div.id = 'badguy' + ENEMIES;

		document.body.appendChild(div);
	}
}