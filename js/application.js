
window.requestAnimFrame = (function(callback) {
return window.requestAnimationFrame || window.webkitRequestAnimationFrame
	|| window.mozRequestAnimationFrame || window.oRequestAnimationFrame
	|| window.msRequestAnimationFrame || function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

// Setup environment
c = document.getElementById("timebeach");
ctx = c.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var anim = new Object(),
numStars = 0,
sizes = ['micro', 'mini', 'medium', 'big', 'max'],
max_bright = 1,
min_bright = .2,
density = 30,
starArray = [],
upDown = 0;

// Plan on changing these for animations
function initializeCoords() {
	anim.horizon = ctx.canvas.height/3;
	// Orb coordinates
	anim.moonX = ctx.canvas.width/2;
	anim.moonY = ctx.canvas.height/6;
	// Orb size
	anim.moonR = (anim.horizon - anim.horizon/3)/2;
	// Shine gradient radius
	anim.smallerCirc = ctx.canvas.width/50;
  	anim.largerCirc = ctx.canvas.width-ctx.canvas.width/2;
}

// HSL Colors go here to decrease calculations
var colorPalettes = {
	morning: { sky: "", beach: "", ocean: "", orb: "" },
	daytime: { sky: "", beach: "", ocean: "", orb: "" },
	evening: { sky: "", beach: "", ocean: "", orb: "" },
	night: { 
		sky: "hsl(226, 47%, 14%)",
		skyLight: "hsl(219, 60%, 40%)",
		beach: "", 
		ocean: "hsl(226, 40%, 15%)", 
		oceanLight: "hsl(232, 46%, 45%)",
		orb: "hsl(55, 100%, 83%)",
		orbLight: "hsl(49, 100%, 99%)"  
	}
}

// Time zone determination

var time = "night";

switch(time) {
	case "morning":
		var palette = colorPalettes.morning;
		break;
	case "daytime":
		var palette = colorPalettes.daytime;
		break;
	case "evening":
		var palette = colorPalettes.evening;
		break;
	case "night":
		var palette = colorPalettes.night;
		break;
}

function animate(numberOfStarsToAnimate) {
	Beach.drawSky();
	for(var i = 0; i < numberOfStarsToAnimate; i++) {
		var id = randomInt(0, starArray.length - 1),
			obj = starArray[id],
			newAlpha = obj.alpha;
		do {
			newAlpha = randomFloatAround(obj.alpha);
		} while(newAlpha < min_bright || newAlpha > max_bright)
		starArray[id] = Beach.createStar(obj.x, obj.y, obj.size, newAlpha);
	}
	Beach.generateStars();
	Beach.drawOrb();
	window.requestAnimationFrame(function() {
		animate(numberOfStarsToAnimate);
	});
}

Beach = {
  	init: function() {
  		c = document.getElementById("timebeach");
  		ctx = c.getContext("2d");
  		ctx.canvas.width  = window.innerWidth;
  		ctx.canvas.height = window.innerHeight;
  		initializeCoords();
  		// Stars
  		var density = 20;
  		numStars = Math.floor(ctx.canvas.width/density * (ctx.canvas.height/3)/density);
  		var starArray = [];
  		// Sky gradient for drawing stars
  		var skyGrd=ctx.createRadialGradient(anim.moonX, anim.moonY, anim.smallerCirc, anim.moonX, anim.moonY, anim.largerCirc);
		skyGrd.addColorStop(0,palette.skyLight);
		skyGrd.addColorStop(1,palette.sky);
		ctx.fillStyle=skyGrd;
  	},
  	drawSky: function() {
  		var smallerCirc = ctx.canvas.width/50;
  		var largerCirc = ctx.canvas.width-ctx.canvas.width/1.6;
  		var grd=ctx.createRadialGradient(anim.moonX, anim.moonY, anim.smallerCirc, anim.moonX, anim.moonY, anim.largerCirc);
		grd.addColorStop(0,palette.skyLight);
		grd.addColorStop(1,palette.sky);
		ctx.fillStyle=grd;
		ctx.fillRect(0,0,ctx.canvas.width, anim.horizon);
  	},
  	drawOcean: function() {
  		var grd = ctx.createLinearGradient(ctx.canvas.width/2, (ctx.canvas.height/2)-1, ctx.canvas.width/2, ctx.canvas.height);
  		grd.addColorStop(0, palette.oceanLight);
  		grd.addColorStop(1, palette.ocean);
  		ctx.fillStyle = grd;
  		ctx.fillRect(0, anim.horizon-1, ctx.canvas.width, ctx.canvas.height)
  	},
  	drawOrb: function() {
  		ctx.beginPath();
      	ctx.arc(anim.moonX, anim.moonY, anim.moonR, 0, 2 * Math.PI, false);
      	var grd = ctx.createRadialGradient(
      		anim.moonX + anim.moonR/2, 
      		anim.moonY - anim.moonR/2, 
      		anim.smallerCirc, 
      		anim.moonX + anim.moonR/2, 
      		anim.moonY - anim.moonR/2, 
      		anim.moonR * 1.3
      	);
		grd.addColorStop(0,palette.orbLight);
		grd.addColorStop(1,palette.orb);
		ctx.fillStyle = grd;
      	ctx.fill();
  	},
  	drawReflections: function() {

  	},
  	generateStars: function(starsCount, opacity) {
		for(var i = 0; i < numStars; i++) {
			var x = randomInt(2, ctx.canvas.width-2),
				y = randomInt(2, anim.horizon-2),
				size = sizes[randomInt(0, sizes.length-1)];
			if(starArray.length < numStars) {
				starArray.push(Beach.createStar(x, y, size, opacity));
			} else {
				Beach.drawStar(starArray[i].x, starArray[i].y, starArray[i].size, starArray[i].alpha)
			}
			
		}
  	},
  	createStar: function(x, y, size, alpha) {
  		Beach.drawStar(x, y, size, alpha);
		return {
			'x': x,
			'y': y,
			'size': size,
			'alpha': alpha
		};
  	},
  	drawStar: function(x, y, size, alpha) {
  		var radius = 0;
		switch(size) {
			case 'micro':
				radius = 0.4;
				break;
			case 'mini':
				radius = 0.7;
				break;
			case 'medium':
				radius = 1.5;
				break;
			case 'big':
				radius = 2.0;
				break;
			case 'max':
				radius = 2.9;
				break;
		}
		grd = ctx.createRadialGradient(x, y + upDown, 0, x + radius, y + radius + upDown, radius * 2);
		grd.addColorStop(0, 'rgba(255, 255, 255, ' + alpha + ')');
		grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
		// clear background pixels
		// ctx.beginPath();
		// ctx.clearRect(x - radius - 1, y - radius - 1, radius * 2 + 2, radius * 2 + 2);
		// ctx.closePath();
		// draw star
		ctx.beginPath();
		ctx.arc(x,y + upDown,radius,0,2*Math.PI);
		ctx.fillStyle = grd;
		ctx.fill();
  	}
}



// Helper functions

function hslLChange(hslString, addedLVal) {
	var lVal = hslString.match(/...\)$/g).toString().substr(0,2);
	var newLVal = parseInt(lVal) + addedLVal;
	if(newLVal>100) {
		newLVal = 100;
	} else if(newLVal<0) {
		newLVal = 0;
	}
	return hslString.replace(/...\)$/g, newLVal + "%)");
}

function randomInt(a, b) {
	return Math.floor(Math.random()*(b-a+1)+a);
}

function randomFloatAround(num) {
	var plusminus = randomInt(0, 1000) % 2,
		val = num;
	if(plusminus)
		val += 0.1;
	else
		val -= 0.1;
	return parseFloat(val.toFixed(1));
}


// Temp request frame
function run() {
	Beach.init();
	Beach.drawSky();
	Beach.generateStars(numStars, 0.5)
	Beach.drawOrb();
	Beach.drawOcean();
}