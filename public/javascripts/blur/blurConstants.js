//Amount to increase time by if the user is correct
var INCREASE      = 3;

//Amount to decrease time by if the user is incorrect
var DECREASE      = 12;

//The amount applied for the filter
var BASEBLUR      = 30;
var BASEGRAYSCALE = 1;
var BASEHUE       = 180;

//The number of options to choose from
var OPTIONS       = 4;

//The number of seconds
var count         = 30;

//The ans img location
//var ans_img = "/images/bg_pics/butterfly.jpg";
var ANSIMG = "https://s3.amazonaws.com/labs.schybo.com.blur/blurPhotos/";

//Fix 4, east, left
var answer;
var option2;
var option3;
var option4;

var ans_loc;

var blur_interval;
var grayscale_interval;
var hue_interval;

//The variable amount of filters
var blur = BASEBLUR;
var grayscale = BASEGRAYSCALE;
var hue = BASEHUE;

//The difficulty of the game
var difficulty;

//The number of options to choose from
var places = [];

for (i=1; i<=OPTIONS; i++) {
	places.push(i)
}

//Indicates whether the snitch is currently alive
var snitch_alive = false;

//The score
var score = 0;

//Indicates whether pause is on (and it's paused until the end of intro)
var pause_on = true;