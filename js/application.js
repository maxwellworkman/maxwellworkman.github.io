


// Plan on changing these for animations


// HSL Colors go here to decrease calculations


// Time zone determination





(function() {
	c = document.getElementById("solids");
	ctx = c.getContext("2d");
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	d = document.getElementById("stars");
	dtx = d.getContext("2d");
	dtx.canvas.width  = window.innerWidth;
	dtx.canvas.height = window.innerHeight;

	e = document.getElementById("sparkles");
	etx = e.getContext("2d");
	etx.canvas.width  = window.innerWidth;
	etx.canvas.height = window.innerHeight;

	// Performance calculation
	var $out = $('#out');

	var colorPalettes = {
		morning: { 
			sky: "hsl(226, 47%, 14%)",
			skyLight: "hsl(219, 60%, 40%)",
			beach: "", 
			ocean: "hsl(226, 40%, 35%)", 
			oceanLight: "hsl(232, 46%, 45%)",
			orb: "hsl(55, 100%, 83%)",
			orbLight: "hsl(49, 100%, 99%)"  
		},
		daytime: { 
			sky: "hsl(200, 100%, 45%)",
			skyLight: "hsl(200, 100%, 65%)",
			beach: "", 
			ocean: "hsl(210, 100%, 30%)", 
			oceanLight: "hsl(210, 100%, 50%)",
			orb: "hsl(55, 100%, 83%)",
			orbLight: "hsl(49, 100%, 99%)"  
		},
		evening: { sky: "", beach: "", ocean: "", orb: "" },
		night: { 
			sky: "hsl(226, 47%, 14%)",
			skyLight: "hsl(219, 60%, 40%)",
			beach: "", 
			ocean: "hsl(226, 40%, 35%)", 
			oceanLight: "hsl(232, 46%, 45%)",
			orb: "hsl(55, 100%, 83%)",
			orbLight: "hsl(49, 100%, 99%)",
			ref: function(alpha) {
				return "hsla(55, 100%, 83%, " + alpha + ")"
			}
		}
	}

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

	var sizes = ['micro', 'mini', 'medium', 'big', 'max'],
	max_bright = 1,
	min_bright = .4,
	density = 20,
	refDensity = 200,
	starArray = [],
	refArray = [],
	upDown = 0,
	skyGrd;
	var numStars = Math.floor(ctx.canvas.width/density * (ctx.canvas.height/3)/density)

	var anim = new Object();
	anim.horizon = Math.floor(ctx.canvas.height/3);
	// Orb coordinates
	anim.moonX = Math.floor(ctx.canvas.width/2);
	anim.moonY = Math.floor(ctx.canvas.height/6);
	// Orb size
	anim.moonR = Math.floor((anim.horizon - anim.horizon/3)/2);
	// Shine gradient radius
	anim.smallerCirc = Math.floor(ctx.canvas.width/50);
  	anim.largerCirc = Math.floor(ctx.canvas.width-ctx.canvas.width/2);
  	// Reflection variables
  	anim.refWidth = Math.floor(2*anim.moonR);
  	anim.refHeight = Math.floor(ctx.canvas.height - anim.horizon);
  	anim.refNumber = Math.floor(anim.refWidth*anim.refHeight/refDensity);
  	anim.refAngle = 200;
  	anim.refRelX = anim.moonX;
  	anim.refRelY = anim.horizon;
  	anim.numberOfTwinkles = 20;
	
	// setup Sky Gradient
	skyGrd=ctx.createRadialGradient(anim.moonX, anim.moonY, anim.smallerCirc, anim.moonX, anim.moonY, anim.largerCirc);
	skyGrd.addColorStop(0,palette.skyLight);
	skyGrd.addColorStop(1,palette.sky);

	// setup Reflection gradient
	var refGrd = etx.createLinearGradient(anim.moonX-anim.refWidth/2, 0, anim.moonX+anim.refWidth/2, 0);
	refGrd.addColorStop(0,palette.oceanLight);
	refGrd.addColorStop(0.5,palette.orb);
	refGrd.addColorStop(1,palette.oceanLight);


	function animate() {
		Beach.twinkleStars(anim.numberOfTwinkles);
		Beach.drawRefs();
		window.requestAnimationFrame(function() {
			$out.html(countFPS());
			animate();
		});
	}


	Beach = {
	  	init: function() {
	  		/*
	  		c = document.getElementById("timebeach");
	  		ctx = c.getContext("2d");
	  		ctx.canvas.width  = window.innerWidth;
	  		ctx.canvas.height = window.innerHeight;
	  		initializeCoords();
	  		// Stars
	  		var density = 15;
	  		numStars = Math.floor(ctx.canvas.width/density * (ctx.canvas.height/3)/density);
	  		var starArray = [];
	  		// Sky gradient for drawing stars
	  		skyGrd=ctx.createRadialGradient(anim.moonX, anim.moonY, anim.smallerCirc, anim.moonX, anim.moonY, anim.largerCirc);
			skyGrd.addColorStop(0,palette.skyLight);
			skyGrd.addColorStop(1,palette.sky);
			*/

			// Setup environment
			/*
			c = document.getElementById("timebeach");
			ctx = c.getContext("2d");
			ctx.canvas.width  = window.innerWidth;
			ctx.canvas.height = window.innerHeight;
			var anim = new Object(),
			numStars = 0,
			sizes = ['micro', 'mini', 'medium', 'big', 'max'],
			max_bright = 1,
			min_bright = .4,
			density = 50,
			starArray = [],
			upDown = 0,
			skyGrd;
			*/
	
	  	},
	  	initializeCoords: function() {
			anim.horizon = ctx.canvas.height/3;
			// Orb coordinates
			anim.moonX = ctx.canvas.width/2;
			anim.moonY = ctx.canvas.height/6;
			// Orb size
			anim.moonR = (anim.horizon - anim.horizon/3)/2;
			// Shine gradient radius
			anim.smallerCirc = ctx.canvas.width/50;
  			anim.largerCirc = ctx.canvas.width-ctx.canvas.width/2;
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
	  	generateRef: function() {
	  		return {
	  			'x': randomInt(anim.refRelX-anim.refWidth/2,anim.refRelX+anim.refWidth/2 ),
	  			'y': randomInt(0, anim.refHeight),
	  			'alive': false,
	  			'alpha': 0,
	  			'r': randomInt(-3, 3)
	  		}
	  	},
	  	initRefs: function() {
	  		for(var i = 0; i < anim.refNumber; i++) {
	  			refArray.push(Beach.generateRef());
	  		}
	  	},
	  	drawRefs: function() {
	  		//etx.fillStyle = refGrd;
	  		precalculation = Math.floor(Math.pow(anim.refHeight, 3));
	  		etx.clearRect(0,anim.horizon,etx.canvas.width, etx.canvas.height);

	  		var i = 0;
			do {

				refArray[randomInt(0,refArray.length-1)].alive = true;
    			i++;
			}
			while (i < 10);

			// Kill some reflections and generate new ones

	  		
	  		// Iterate through each 
			refArray.forEach(function(e) {
				if(e.alive === true) {
					
					if(e.alpha > 1) {
						e.alive = false;
					} else {
						e.alpha += 0.02;
					}
				}
				else {
					e.alpha -= 0.02;
				}
				Beach.drawRef(e, precalculation);
			});

			etx.clearRect(0,0,etx.canvas.width,anim.horizon)
	  	},
	  	drawRef: function(e, precalculation) {
	  		etx.fillStyle = palette.ref(e.alpha);
	  		etx.beginPath();
				etx.ellipse(
					Math.floor((e.x - (e.x - anim.refRelX) * (e.y / anim.refHeight)/1.8)), 
					anim.refRelY + Math.floor(anim.refHeight * (Math.pow(e.y, 3) / precalculation)) % anim.refHeight,
      				Math.floor(5 + (7 * (e.y / anim.refRelY))),
      				Math.floor(1 + (1 * (e.y / anim.refRelY))),
      				e.r * Math.PI/180, 0, 2 * Math.PI
    			);
    			etx.fill();
    	},
	  	generateStars: function(starsCount, opacity) {
			for(var i = 0; i < numStars; i++) {
				var x = randomInt(2, ctx.canvas.width-2),
					y = randomInt(2, anim.horizon-10),
					size = sizes[randomInt(0, sizes.length-1)];
	
				// make sure the points don't collide with orb + 5
				var distanceFromOrb = Math.floor(Math.sqrt((x-anim.moonX)*(x-anim.moonX)+(y-anim.moonY)*(y-anim.moonY)));
				if(distanceFromOrb>(anim.moonR + 5)) {
					starArray.push(Beach.createStar(x, y, size, opacity));
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
					radius = 0.6;
					break;
				case 'mini':
					radius = 0.8;
					break;
				case 'medium':
					radius = 1.3;
					break;
				case 'big':
					radius = 1.4;
					break;
				case 'max':
					radius = 2.0;
					break;
			}

			strGrd = dtx.createRadialGradient(x, y + upDown, 0, x + radius, y + radius + upDown, radius * 2);
			strGrd.addColorStop(0, 'rgba(255, 255, 255, ' + alpha + ')');
			strGrd.addColorStop(1, 'rgba(0, 0, 0, 0)');
			//ctx.fillStyle = skyGrd;
			//ctx.fillRect(x - radius - 1, y - radius - 1, radius * 2 + 2, radius * 2 + 2);
	
			dtx.beginPath();
			dtx.arc(x,y + upDown,radius+0.1,0,2*Math.PI);
			dtx.fillStyle = skyGrd;
			dtx.fill();
	
			dtx.beginPath();
			dtx.arc(x,y + upDown,radius,0,2*Math.PI);
			dtx.fillStyle = strGrd;
			dtx.fill();
	  	},
	  	twinkleStars: function(numberOfStarsToAnimate) {
	  		for(var i = 0; i < numberOfStarsToAnimate; i++) {
			var id = randomInt(0, starArray.length - 1),
				obj = starArray[id],
				newAlpha = obj.alpha;
			do {
				newAlpha = randomFloatAround(obj.alpha);
			} while(newAlpha < min_bright || newAlpha > max_bright)
			starArray[id] = Beach.createStar(obj.x, obj.y, obj.size, newAlpha);
			}
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
	
	function randomSize(a, b) {
		starCounter += 1;
		if(starCounter%50 === 0) {
			return 6;
		}
		return Math.floor(Math.random()*(b-a)+a);
	}
	
	
	function randomFloatAround(num) {
		var plusminus = randomInt(0, 1000) % 2,
			val = num;
		if(plusminus)
			val += 0.2;
		else
			val -= 0.2;
		return parseFloat(val.toFixed(1));
	}
	
	// Performance
	window.countFPS = (function () {
  		var lastLoop = (new Date()).getMilliseconds();
  		var count = 1;
  		var fps = 0;

  		return function () {
    		var currentLoop = (new Date()).getMilliseconds();
    		if (lastLoop > currentLoop) {
    	  		fps = count;
    	  		count = 1;
    		} else {
    	  		count += 1;
    		}
    		lastLoop = currentLoop;
    		return fps;
  		};
	}());

	
	Beach.init();
	Beach.drawSky();
	Beach.generateStars(numStars, 0.5);
	Beach.initRefs();
	Beach.drawRefs();
	Beach.drawOrb();
	Beach.drawOcean();
	animate();

})();




