function reduceTimeMultiplier() {
  if (time_mult != 1) {
    time_mult = Math.floor(time_mult / 2);
  } else {
    clearInterval(time_interval);
  }
}

function play_game() {
  //Resumes the clock
  resumeClock();

  //Start the blur reduction
  if (difficulty == "easy") {
    blur_interval = setInterval(blurReduction, 250);
  } else if (difficulty == "medium") {
    if (new_picture) {
      resetHue();
      new_picture = false;
    }
    hue_interval = setInterval(hueReduction, 250);
  } else {
    if (new_picture) {
      resetGrayscale();
      new_picture = false;
    }
    grayscale_interval = setInterval(grayscaleReduction, 250);
  }

  //Indicates the game is not paused
  setTimeout(function () {
    pause_on = false;
  }, 200);

  //Start the time multiplier reduction
  time_interval = setInterval(reduceTimeMultiplier, callTimeReduction);
}

function pause_game() {
  //If we need to change the icon then do so
  //Stops the clock and clears interavals
  stopClock();

  //Indicates that the pause is on
  pause_on = true;

  if (difficulty == "easy") {
    clearInterval(blur_interval);
  } else if (difficulty == "medium") {
    clearInterval(hue_interval);
  } else {
    clearInterval(grayscale_interval);
  }

  //Clear the time multiplier reduction if not already
  clearInterval(time_interval);

  clearInterval(blur_interval);
}

function restart() {
  //Remove old images
  $(".face").remove();

  //Hide both just in case
  $('#gameOver').modal('hide');
  $('#highScores').modal('hide');
  //$('#highScores-test').foundation('reveal', 'close');
  score = 0;
  document.getElementById("score").innerHTML=score;
  count = 30;
  hund_count = 100;
  document.getElementById("timer").innerHTML=count + ".";
  document.getElementById("timer_hund").innerHTML='00';

  document.getElementById("time_down").pause();

  //Change timer style if necessary
  var timer_div = document.getElementById('timer_style');
  timer_div.style.color = "#FEFEFE";
  timer_div.style.textShadow = 'none';
  timer_div.style.moztextShadow = 'none;';
  timer_div.style.webkitextShadow = 'none;';

  //Allow user to enter high score again
  $('#submitHS').prop('disabled',false);

  //Reset the blur (plus 1 for the second transition)
  blur = BASEBLUR;
  hue = BASEHUE;
  grayscale = BASEGRAYSCALE;

  new_picture = true;
  initial_img = getPhotoInfo();

  getInitialImg();
  placeOptions();

  play_game();
}

function changePicture() {
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
}

function keyPress(key) {
  var arrow = '#' + key;
  $(arrow).css('color', '#DA727E');
  setTimeout(function () {
    $(arrow).css('color', '#455C7B');
  }, 150);
  
  if ((key == 'left') && (ans_loc == 4)) {
    correct();
    
    setTimeout(changePicture, 500);

  } else if ((key == 'bottom') && (ans_loc == 3)) {
    correct();
    
    setTimeout(changePicture, 500);

  } else if ((key == 'right') && (ans_loc == 2)) {
    correct();
    
    setTimeout(changePicture, 500);

  } else if ((key == 'top') && (ans_loc == 1)) {
    correct();
    
    setTimeout(changePicture, 500);

  //If they are incorrect in their guess
  } else {
    if (count < DECREASE) {
      pause_game();

      count = 0;
      hund_count = 0;
      document.getElementById("timer").innerHTML=count + ".";
      document.getElementById("timer_hund").innerHTML = "00";

      $('#gameOver').modal('show');
    } else {
      count-=DECREASE;
      if (count <= 0) {
        clearInterval(counter);
        count = 0;
      }
      document.getElementById("timer").innerHTML=count + ".";
    }
  }
}

function onKeyDown(evt) {
  //Changes boolean variable to true if key is pressed
  if (!pause_on) {
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

function init_quick() {
  //Closes the walkthrough dropdown.
  $('#walkthrough').modal('hide');

  initial_img = getPhotoInfo();

  getInitialImg();
  placeOptions();

  play_game();
}

//The slow init
function init() {
  //Closes the walkthrough dropdown.
  $('#walkthrough').modal('hide');

  initial_img = getPhotoInfo();

  getInitialImg();
  placeOptions();
  pause_game();

  //The introduction
  var intro = introJs();

  intro.setOption('showButtons', false);
  intro.setOptions({
  steps: [
      { 
        element: '#card',
        intro: "This is the <strong>filtered</strong> image. As <strong>time decrease</strong> so does the <strong>filter on the image</strong>"
      },
      { 
        element: '#option',
        intro: "This is a possible <strong>option</strong> for the image. Select them with the <strong>arrow keys</strong>. Press <strong>left</strong> to select this one."
      },
      {
        element: '#timer_style',
        intro: "Guess as many images as you can before <strong>time runs out</strong>. <strong>Incorrect</strong> guesses <strong>reduce</strong> the clock while <strong>correct</strong> guesses increase the clock.",
        position: 'bottom'
      },
      {
        element: '#score_style',
        intro: "The more pictures you guess the <strong>higher</strong> your score. Try and get on the <strong>highscore</strong> board",
        position: 'bottom'
      },
    ]
  });
  intro.oncomplete(play_game)
  .onexit(play_game)
  .start();
}