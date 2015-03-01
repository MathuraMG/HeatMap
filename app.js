//variable definitions
var row =50, col = 50;
var h = 500, w=500;

var max_int = 10, scale =5;
var points = {};

function reset()
{
	canvas = getCanvas();
	ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,500,500);
}

function getCanvas()
{
	return(document.getElementById("heatmap"));
}

// Function to create the canvas element
function createCanvas()
{
	canvas = document.createElement('canvas');
	canvas.classList.add("heatmap");
	canvas.id = "heatmap";
	document.body.appendChild(canvas);
	canvas.width = 500;
	canvas.height = 500;
}
function addToPoint( x, y, radius)
{
	ctx.fillStyle = getColor(radius);
	radius = radius*12;//Math.sqrt(radius)*20;
	console.log("radius: " , radius);
	ctx.beginPath();
	ctx.arc(x,y,radius,0,Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

function getColor( intensity)
{
	var colors = ["#072933","#2E4045","#8C593B","#b2814e", "#fac268","#fad237"];
	ctest = colors[Math.floor(intensity/2)];
	return( colors[Math.floor(intensity/2)]);
}

function addValueToPoint(x,y)
{
	x=Math.floor(x/scale);
	y=Math.floor(y/scale);

	if(!points[[x,y]])
	{
		points[[x,y]] = 1;
	}
	else if (points[[x,y]] ==10)
	{}
	else
	{
		points[[x,y]]++;
	}
	addToPoint(x*scale,y*scale, points[[x,y]]);
}

function drawPoint(e)
{
	canvas = getCanvas();
	ctx = canvas.getContext("2d");

	ctx.globalAlpha = 0.2;
	ctx.globalCompositeOperation = "lighter";
	ctx.fillStyle = "#234fe5";
	x = e.clientX - e.target.offsetLeft;
	y = e.clientY-  e.target.offsetTop; 
	console.log("(x,y) location ", x,y);
	console.log("canvas prop ", canvas.width, canvas.height);
	addValueToPoint(x,y);
}

function onMove()
{
	canvas = getCanvas();
	canvas.onmousemove = drawPoint;
}

function main()
{
	//create the canvas
	createCanvas();
	//check mouse movmt
	onMove();
}

window.onload = main;