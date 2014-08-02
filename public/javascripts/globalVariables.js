//Keypress boolean variables
var rightKey   = false;
var leftKey    = false;
var upKey      = false;
var downKey    = false;
var spaceBar   = false;

//The initial_img
var initial_img;

//The number of miliseconds
var hund_count = 100;

//Needed so that they're global
var counter;
var counter_hund;

//The width & height of the screen
var size = {
  //width: (window.innerWidth - 20) || (document.body.clientWidth - 20),
  width: 1100,
  //height: (window.innerHeight - 20) || (document.body.clientHeight - 20)
  height: 550
}