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