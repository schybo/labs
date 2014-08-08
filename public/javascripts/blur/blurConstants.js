//Amount to increase time by if the user is correct
var INCREASE      = 3;

//Amount to decrease time by if the user is incorrect
var DECREASE      = 12;

//How long the user has before the filter is completely gone
var TIMETILLGONE = 10;

//How quickly we reduce the filters in miliseconds
var REDUCEFILTER = 250;

//The amount applied for the filter
var BASEBLUR      = 10;
var BASEGRAYSCALE = 1;
var BASEHUE       = 180;

//The starting amount of reduction appplied every second to the filters 
var REDUCBLUR      = BASEBLUR / (TIMETILLGONE / (REDUCEFILTER * MILLITOSECONDS));
var REDUCGRAYSCALE = BASEGRAYSCALE / (TIMETILLGONE / (REDUCEFILTER * MILLITOSECONDS));
var REDUCHUE       = BASEHUE / (TIMETILLGONE / (REDUCEFILTER * MILLITOSECONDS));

//The variable amount of reduction applied to the filters
var reduce_blur = REDUCBLUR;
var reduce_grayscale = REDUCGRAYSCALE;
var reduce_hue = REDUCHUE = REDUCHUE;

//The number of options to choose from
var OPTIONS       = 4;

//The base score amoutn
var BASESCORE = 1;

//Score multipliers
var EASYMULT = 1;
var MEDMULT  = 2;
var HARDMULT = 3;

//The number of seconds
var count         = 30;

//The intial time multiplier
var TIMEMULT = 16;

//The descreasing score multiplier
var time_mult = TIMEMULT;

//How often to call the reduction of timeMultiplier
var callTimeReduction = 2000;

//The interval for reducing time multiplier
var time_interval;


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

//If we're starting a new picture
var new_picture = true;

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