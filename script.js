var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var count = 0;
var lifes = 3;
var score = 0;
var x = canvas.width/2;
var y = canvas.height - 40;
var dx = 2;
var dy = -2;
var paddleX = canvas.width/2 -37;
var paddleHeight = 20;
var paddleWidth = 75;
var paddleY = canvas.height - 30;
var bricks = [];
	for(var c = 0; c < 4; c++){
			bricks[c] = [];
			for( var r = 0; r < 5; r++){
				bricks[c][r] = {x:0 , y:0 , status:1};
			}		
	}

var myInterval = setInterval(draw,10);


function draw(){

	if(count >= 20){
		clearInterval(myInterval);
		alert("You won");
    	window.location.reload();
	} else if(lifes < 0) {
		clearInterval(myInterval);
		alert("GAME OVER!!!");
    	window.location.reload();	
	} else	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		collisionDetection();
		drawBall();
		drawPaddle();
		drawBricks();
		writeText();
	}
		
}

function drawBall(){
	

	ctx.beginPath();
	ctx.arc(x,y,10,0,Math.PI*2);
	ctx.fillStyle = "#C0485E";
	ctx.fill();
	ctx.closePath();
	x += dx;
	y += dy;



}

function collisionDetection(){

	if(x > canvas.width-10 || x < 10){
		dx = -dx;
	}
	if(y < 10){
		dy = -dy;
	}
    if(y > paddleY-10){
    	if(x >= paddleX && x <= paddleX+paddleWidth){
    		dy = -dy;
    	} else if (y > canvas.height -10){
    		lifes--;
    		x = canvas.width/2;
			y = canvas.height - 40;
			dx = 2;
			dy = -2;
    		draw();
    		
    	}
    } 

    for(var c = 0; c < 4; c++){
		for( var r = 0; r < 5; r++){
			if((x >= bricks[c][r].x && x <= bricks[c][r].x+70) && ((y >= bricks[c][r].y) && y <= bricks[c][r].y+10) ){

				if(bricks[c][r].status == 1) {
						bricks[c][r].status = 0;
						//console.log (bricks[c][r].x + " " + bricks[c][r].y + " " + c + " " + r + " " + x + " " + y);
						dy = -dy;
						r = 10;
						c = 10;
						count++;
						score += 10;
						
				}
			}
				
		}
			
	}
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
	ctx.fillStyle = "#D6CEE3";
	ctx.fill();
	ctx.closePath();
}

document.addEventListener("keydown", function(e){
	
	if (e.keyCode === 37) {
		if(paddleX >= 0 ){
			paddleX -= 20;

		}
	} else if (e.keyCode === 39){
		if(paddleX <= canvas.width - 76){
			paddleX += 20;
		}
	}
});

function drawBricks(){
	var yy = 30; 
		
	for(var c = 0; c < 4; c++){
		var xx = 15;
		for( var r = 0; r < 5; r++){
				if(bricks[c][r].status == 1) {
					bricks[c][r].x = xx;
					bricks[c][r].y = yy;
					ctx.beginPath();
					ctx.rect(xx, yy, 70, 10);
					ctx.fillStyle = "#3C99C0";
					ctx.fill();
					ctx.closePath();
					xx += 80;
				}
			}	
			yy += 30;	
	}
	
}


function writeText(){
	ctx.font="20px Georgia";
	var p = "Score: " + score;
	ctx.fillText(p,20,20);

	ctx.font="20px Georgia";
	var l = "Lifes: " + lifes;
	ctx.fillText(l,canvas.width - 150,20);
}

document.addEventListener("mousemove", function(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width){
		paddleX = relativeX - 35;  // width of paddle /2
	}
});

document.addEventListener("touchmove", function(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX > 0 && relativeX < canvas.width){
		paddleX = relativeX - 35;  // width of paddle /2
	}
});