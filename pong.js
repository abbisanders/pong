function getCanvas() {
	return $("#middleCanvas")[0].getContext("2d");
}

function drawO(rowNum, colNum) {
	var canvas = getCanvas();

	// Draw the circle
	canvas.beginPath();
	canvas.arc(5+10*colNum, 5+10*rowNum, 5, 0, 2*Math.PI, false); // arc(centerX, centerY, radius, startAngle, endAngle, ccw?)
	canvas.stroke();

}
function cleanSquare(rowNum, colNum) {
	var canvas = getCanvas();

	canvas.beginPath();
	canvas.rect(10*colNum-2, 10*rowNum-2, 14, 14); //(x,y,width,height)
	canvas.fillStyle = 'white';
	canvas.fill();
}
function paddle(colNum) {
	var canvas = getCanvas(); 
	canvas.beginPath();
	canvas.rect(10*colNum, 310, 20, 10);
	canvas.fillStyle = 'blue';
	canvas.fill();
	
}
function cleanPaddle(colNum) {
	var canvas = getCanvas();
	canvas.beginPath();
	canvas.rect(10*colNum, 310, 20, 10);
	canvas.fillStyle = 'white';
	canvas.fill();
}
var X = 2;
var Y = 2;
var direction = "ne";
var leftSideOfPaddle = 11;
var timer = null;
var score = 0;


function oneStep() {
	if (direction=="ne") {
		X = X+1;
		Y = Y-1;
		}
	if (direction=="nw") {
		X = X-1;
		Y = Y-1;
		}
	if (direction=="sw") {
		X = X-1;
		Y = Y+1;
	}
	if (direction=="se") {
		X = X+1;
		Y = Y+1;
		}
	if (X == 31 && direction == "ne") {
		direction = "nw";
	}
	if (X == 0 && direction == "nw") {
		direction = "ne";
	}
	if (Y==0 && direction == "ne") {
		direction = "se";
	}
	if (Y == 0 && direction == "nw") {
		direction = "sw";
	}
	if (X == 31 && direction == "se") {
		direction = "sw";
	}
	if (X == 0 && direction == "sw") {
		direction = "se";
	}	
	if (Y == 30 && (X == leftSideOfPaddle || X == leftSideOfPaddle+1)) {
		if (direction=="sw"){
			direction="ne";
			score = score+1;
		}
		if (direction="se"){
			direction="nw";
			score = score+1;
		}
	}
	if (Y == 31) {
		clearInterval(timer);
		window.alert("you lose");
		window.alert("score: "+score);
	}
}
function draw1Step() {
	paddle(leftSideOfPaddle);
	cleanSquare(Y,X);
	oneStep();
	drawO(Y,X);
}

$(document).ready(function () {
	timer = setInterval(draw1Step,100);
	$(document).keypress(function (ev) {
		if (ev.keyCode == 37) {
			cleanPaddle(leftSideOfPaddle);
			leftSideOfPaddle = leftSideOfPaddle-1;
			paddle(leftSideOfPaddle);
		}
		else if (ev.keyCode == 39) {
			cleanPaddle(leftSideOfPaddle);
			leftSideOfPaddle = leftSideOfPaddle+1;
			paddle(leftSideOfPaddle);
		}
	});
});

