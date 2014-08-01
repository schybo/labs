//The number of enemies at the start
var NUGGETS = 1;

//The number of enemies at the start
var ENEMIES = 0;

//The score multiplier
var MULTIPLIER = 1.5;

//Top margin of game board
var TOPMARGIN = 100;

//Size of a nugget 
var NUGGETSIZE = 16;

//Size of an enemy
var ENEMYSIZE = NUGGETSIZE;

//Size of the hero
var HEROSIZE = NUGGETSIZE;

//The amount of movement done by the hero
var MOVEMENT = 5;

//The number of enemies left on the screen
var nuggets_left = NUGGETS;

//Indicates whether the snitch is currently alive
var snitch_alive = false;

//The score
var score = 0;

//Indicates whether pause is on (and it's paused until the end of intro)
var pause_on = true;

//The left margin of the game board
var left_margin = parseInt($(".playing-field").css('margin-left'), 10);

//Version 2
//var shoot_bullet=setInterval(shootBullet, 100);
//var passes = 0;

//Amount of bullets shot
var bullets_shot = 0;

//How many bad guys should be on the board
var increase_bad_guys = 3;

//The interval to check for hero movement
var inv_hero

//Global variable for enemy movement
var enemy_MOVEMENT;

//The last vertical movement key pressed
var last_vmove;

//The last horizontal movement key pressed
var last_hmove;

//The interval for the snitch
var move_counter;

//The timeout for the silver orb
var so_timeout;