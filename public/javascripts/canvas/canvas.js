var canvas = document.getElementById('genericCanvas');

if (canvas.getContext) {
	var ctx = canvas.getContext('2d');

	/*var degrees = 180;
	var radians = (Math.PI/180)*degrees;*/
	//ctx.fillStyle = "red";

	ctx.fillRect(0,0,300,300);
	for (var i=0;i<3;i++) {
		for (var j=0;j<3;j++) {
		  ctx.save();
		  ctx.strokeStyle = "#9CFF00";
		  ctx.translate(50+j*100,50+i*100);
		  drawSpirograph(ctx,20*(j+2)/(j+1),-8*(i+3)/(i+1),10);
		  ctx.restore();
		}
	}

	/*var img = new Image();
	img.onload = function(){
		ctx.drawImage(img,0,0);
		ctx.beginPath();
		ctx.moveTo(30,96);
		ctx.lineTo(70,66);
		ctx.lineTo(103,76);
		ctx.lineTo(170,15);
		ctx.stroke();
	};
  	img.src = '/images/game_over.gif';*/

	/*ctx.beginPath();
    ctx.moveTo(75,50);
    ctx.lineTo(110,75);
    ctx.lineTo(110,25); //x,y coordinate
    ctx.fill();*/
    //ctx.fillRect (20, 40, 75, 60); //left (x), top (y), width, height
}

function drawSpirograph(ctx,R,r,O){
  var x1 = R-O;
  var y1 = 0;
  var i  = 1;
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  do {
    if (i>20000) break;
    var x2 = (R+r)*Math.cos(i*Math.PI/72) - (r+O)*Math.cos(((R+r)/r)*(i*Math.PI/72));
    var y2 = (R+r)*Math.sin(i*Math.PI/72) - (r+O)*Math.sin(((R+r)/r)*(i*Math.PI/72));
    ctx.lineTo(x2,y2);
    x1 = x2;
    y1 = y2;
    i++;
  } while (x2 != R-O && y2 != 0 );
  ctx.stroke();
}