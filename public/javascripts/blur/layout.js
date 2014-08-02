function play_game() {
  //Resumes the clock
  resumeClock();

  //Indicates the game is not paused
  pause_on = false;

  //Start the blur reduction
  if (difficulty == "easy") {
    blur_interval = setInterval(blurReduction, 250);
  } else if (difficulty == "medium") {
    resetHue();
    hue_interval = setInterval(hueReduction, 250);
  } else {
    resetGrayscale();
    grayscale_interval = setInterval(grayscaleReduction, 250);
  }
}

function pause_game() {

  //Indicates that the pause is on
  pause_on = true;

  //If we need to change the icon then do so
  //Stops the clock and clears interavals
  stopClock();

  clearInterval(blur_interval);
}

function restart() {
  initial_img = getPhotoInfo();

  getInitialImg();
  placeOptions();

  $('#gameOver').modal('hide');
  //$('#highScores-test').foundation('reveal', 'close');
  score = 0;
  document.getElementById("score").innerHTML=score;
  count = 30;
  hund_count = 100;
  document.getElementById("timer").innerHTML=count + ".";
  document.getElementById("timer_hund").innerHTML='00';

  play_game();
}

function keyPress(key) {
  var arrow = '#' + key;
  $(arrow).css('color', '#DA727E');
  setTimeout(function () {
    $(arrow).css('color', '#455C7B');
  }, 150);
  
  if ((key == 'left') && (ans_loc == 4)) {
    correct();
    
    setTimeout(function () {
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
    }, 500);

  } else if ((key == 'bottom') && (ans_loc == 3)) {
    correct();
    
    setTimeout(function () {
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
    }, 500);

  } else if ((key == 'right') && (ans_loc == 2)) {
    correct();
    
    setTimeout(function () {
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
    }, 500);

  } else if ((key == 'top') && (ans_loc == 1)) {
    correct();
    
    setTimeout(function () {
      //Remove the front div
      $(".back").fadeIn("slow");
      $(".front").fadeOut("slow");
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
    }, 500);

  //If they are incorrect in their guess
  } else {
    count-=DECREASE;
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

function init_quick() {
  initial_img = getPhotoInfo();

  getInitialImg();
  placeOptions();

  play_game();
}

//The slow init
function init() {
  //The introduction
    introJs().setOption('showButtons', false).oncomplete(play_game).onexit(play_game).start();
}