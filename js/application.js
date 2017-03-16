


// Plan on changing these for animations


// HSL Colors go here to decrease calculations


// Time zone determination





(function() {
	//setup canvases
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

	// Colors for transitions
/*	var colors = {
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
	}*/
	var palette;
	var colors = {
		morning: { 
			sky: "rgba(19, 27, 52, 1)",
			skyLight: "rgba(41, 84, 163, 1)",
			ocean: "rgba(54, 70, 125, 1)", 
			oceanLight: "rgba(62, 76, 168, 1)",
			orb: "rgba(255, 248, 168, 1)",
			orbLight: "rgba(255, 254, 250, 1)",
			ref: function(alpha) {
				return "rgba(255, 248, 168, " + alpha + ")"
			}
		},
		daytime: { 
			sky: "rgba(0, 153, 230, 1)",
			skyLight: "rgba(77, 195, 255, 1)",
			ocean: "rgba(40, 114, 189, 1)", 
			oceanLight: "rgba(76, 177, 255, 1)",
			orb: "rgba(250, 214, 121, 1)",
			orbLight: "rgba(255, 254, 250, 1)",
			ref: function(alpha) {
				return "rgba(255, 248, 168, " + alpha + ")"
			}  
		},
		evening: { 
			sky: "rgba(255, 255, 255, 1)",
			skyLight: "rgba(77, 195, 255, 1)",
			ocean: "rgba(40, 114, 189, 1)",
			oceanLight: "rgba(76, 177, 255, 1)",
			orb: "rgba(250, 214, 121, 1)",
			orbLight: "rgba(255, 254, 250, 1)",
			ref: function(alpha) {
				return "rgba(255, 248, 168, " + alpha + ")"
			}
		},
		night: { 
			sky: "rgba(19, 27, 52, 1)",
			skyLight: "rgba(41, 84, 163, 1)",
			ocean: "rgba(54, 70, 125, 1)", 
			oceanLight: "rgba(62, 76, 168, 1)",
			orb: "rgba(255, 248, 168, 1)",
			orbLight: "rgba(255, 254, 250, 1)",
			ref: function(alpha) {
				return "rgba(255, 248, 168, " + alpha + ")"
			}
		}
	}

	var time = "morning";

	switch(time) {
		case "morning":
			var palette = colors.morning;
			break;
		case "daytime":
			var palette = colors.daytime;
			break;
		case "evening":
			var palette = colors.evening;
			break;
		case "night":
			var palette = colors.night;
			break;
	}

	// Star globals
	var sizes = ['micro', 'mini', 'medium', 'big', 'max'],
	max_bright = 1,
	min_bright = .4,
	density = 20,
	starArray = [],

	//Reflection globals
	refDensity = 300,
	maxRefs = 300,
	indirectRefDensity = 800,
	maxIndirectRefs = 30,
	refArray = [],
	inRefArray = [],
	radToDegrees = Math.PI/180,
	twoPi = 2 * Math.PI,
	upDown = 0,
	static = true,
	skyGrd;

	var numStars = Math.floor(ctx.canvas.width/density * (ctx.canvas.height/3)/density)

	var anim = new Object();
	anim.horizon = Math.floor(ctx.canvas.height/3);
	// Orb coordinates
	anim.moonX = Math.floor(ctx.canvas.width - ctx.canvas.width/4);
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
  	anim.refRespawnRate = Math.floor(anim.refNumber/70);
  	anim.refAngle = 200;
  	anim.refRelX = anim.moonX;
  	anim.refRelY = anim.horizon;
  	anim.indirectRefNumber = Math.floor((anim.refHeight * ctx.canvas.width)/indirectRefDensity);
  	anim.indirectRefMargin = Math.floor(ctx.canvas.width/20);
  	anim.inRefRespawnRate = Math.floor(anim.indirectRefNumber/200);
  	// Star variables
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

	// Reflection Globals
	var precalculation = Math.floor(Math.pow(anim.refHeight*2, 3));

	// Timeline Globals
	var tl = new TimelineMax({paused: true}),
	duration = .4,
    ease = Power2.easeOut,
    scrollTweenDuration = 1;

	var scrollTimeout = null,
    scrollTimeoutDelay = 10,
    currentScrollProgress = 0;
	var maxScroll = Math.max(
		document.body.scrollHeight, 
		document.body.offsetHeight, 
		document.documentElement.clientHeight, 
		document.documentElement.scrollHeight, 
		document.documentElement.offsetHeight)
		 - window.innerHeight;

	//RAF runction calls
	function animate() {
		Beach.drawSky();
		Beach.twinkleStars(anim.numberOfTwinkles);
		Beach.drawRefs();
		window.requestAnimationFrame(function() {
			$out.html(countFPS());
			animate();
		});
	}


	Beach = {
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
			debugger;
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
	  	generateRef: function(type) {
	  		var newRef = {
	  			'x': (type ? 
	  				randomInt(anim.refRelX-anim.refWidth/2,anim.refRelX+anim.refWidth/2 ) 
	  				: randomInt(anim.indirectRefMargin, etx.canvas.width - anim.indirectRefMargin)),
	  			'y': (type ? 
	  				randomInt(0, anim.refHeight * 2) 
	  				: randomInt(anim.indirectRefMargin, anim.refHeight * 2)),
	  			'alive': false,
	  			'alpha': 0,
	  			'r': randomInt(-3, 3) * radToDegrees,
	  			'xx': 0,
	  			'yy': 0,
	  			'height': 0,
	  			'width': 0,
	  			'direct': type
	  		}
	  		return Beach.updateRef(newRef);
	  	},
	  	initRefs: function() {
	  		var direct;
	  		// Create direct reflections and indirect reflections
	  		for(var i = 0, direct = true; i < anim.refNumber && i < maxRefs; i++) {
	  			refArray.push(Beach.generateRef(direct));
	  		}
	  		for(var i = 0, direct = false; i < anim.indirectRefNumber && i < maxIndirectRefs; i++) {
	  			inRefArray.push(Beach.generateRef(direct));
	  		}
	  	},
	  	drawRefs: function() {
	  		etx.canvas.width = etx.canvas.width;
	  		//etx.clearRect(0,anim.horizon,etx.canvas.width, etx.canvas.height);
	  		var i = 0;
			do {
				refArray[randomInt(0,refArray.length-1)].alive = true;
    			i++;
			}
			while (i < anim.refRespawnRate);

			if(randomInt(0,5) > 1) {
				inRefArray[randomInt(0,inRefArray.length-1)].alive = true;
			}

	  		var refLength = refArray.length;
	  		var inRefLength = inRefArray.length

	  		// Direct reflection 
	  		for (i = 0; i < refLength; i++) {
	  			if(refArray[i].alive === true) {
					
					if(refArray[i].alpha > 1) {
						refArray[i].alive = false;
					} else {
						refArray[i].alpha += 0.03;
					}
				}
				else {
					refArray[i].alpha -= 0.03;
				}
				Beach.drawRef(refArray[i]);
	  		}
	  		for (i = 0; i < inRefLength; i++) {
	  			if(inRefArray[i].alive === true) {
					
					if(inRefArray[i].alpha > 1) {
						inRefArray[i].alive = false;
					} else {
						inRefArray[i].alpha += 0.03;
					}
				}
				else if(inRefArray[i].alpha < 0) {
					inRefArray[i] = Beach.generateRef(false);
				} else {
					inRefArray[i].alpha -= 0.03;
				}
				Beach.drawRef(inRefArray[i]);
	  		}
			etx.clearRect(0,0,etx.canvas.width,anim.horizon)
	  	},
	  	
	  	drawRef: function(e) {
	  		etx.fillStyle = palette.ref(e.alpha);
	  		etx.beginPath();
	  		if(!static) {
	  			e = Beach.updateRef(e)
	  		}
			etx.ellipse(e.xx, e.yy, e.width, e.height, e.r, 0, twoPi);
    		etx.fill();
    	},
    	updateRef: function(e) {
    		if(e.direct === false) {
    			e.xx = e.x;
    			e.yy = e.y;
    		} else {
    			e.xx = Math.floor((e.x - (e.x - anim.refRelX) * (e.y / anim.refHeight/4)));
    			e.yy = anim.refRelY + Math.floor(anim.refHeight * (Math.pow(e.y, 3) / precalculation)) % anim.refHeight;
    		}
    		e.width = Math.floor(4 + (3 * (e.yy / anim.refRelY)));
   			e.height = Math.floor(1 + (1 * (e.yy / anim.refRelY)/4));
    		return e;
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
					radius = 1;
					break;
				case 'medium':
					radius = 1.4;
					break;
				case 'big':
					radius = 1.6;
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
			dtx.arc(x,y + upDown,radius+0.1,0,twoPi);
			dtx.fillStyle = skyGrd;
			dtx.fill();
	
			dtx.beginPath();
			dtx.arc(x,y + upDown,radius,0,twoPi);
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
	  	},
	  	initBackgroundTweens: function() {
	  		for (var i in colors) {
	  			if(i !== "morning") {
	  				tl.add(TweenMax.to(palette, 6, {
	  					colorProps:{
	  						sky: colors[i].sky, 
	  						skyLight: colors[i].skyLight,
	  						ocean: colors[i].ocean, 
	  						oceanLight: colors[i].oceanLight,
	  						orb: colors[i].orb,
	  						orbLight: colors[i].orbLight
	  					}, 
	  				ease:Linear.easeNone
	  			}));
	  			}

	  		}
	  		debugger;
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

	//jQuery listeners and Timeline tweening
	function listenToScrollEvent() {
    	(window.addEventListener) ? window.addEventListener('scroll', debounceScroll, false) : window.attachEvent('onscroll', debounceScroll);
	}

	function debounceScroll() {
    	clearTimeout(scrollTimeout);
    	scrollTimeout = setTimeout(onScroll, scrollTimeoutDelay);
	}

	function onScroll() {
    	currentScrollProgress = roundDecimal(window.scrollY / maxScroll, 4);
    	console.log(currentScrollProgress)
    	//timeline.progress(currentScrollProgress); // either directly set the [progress] of the timeline which may produce a rather jumpy result
    	TweenMax.to(tl, scrollTweenDuration, {
    	    progress: currentScrollProgress,
    	    ease: ease,
    	    onComplete: tellMe
    	}); // or tween the [timeline] itself to produce a transition from one state to another i.e. it looks smooth
	}

	function roundDecimal(value, place) {
    	return Math.round(value * Math.pow(10, place)) / Math.pow(10, place);
	}
	function tellMe() {
		console.log("createdTween");
	}
	
	// Performance tracker
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

	function drawBackground() {
		Beach.drawSky();
		Beach.drawOrb();
		Beach.drawOcean();
	}

	
	Beach.drawSky();
	Beach.generateStars(numStars, 0.5);
	Beach.initRefs();
	Beach.drawRefs();
	Beach.drawOrb();
	Beach.drawOcean();
	listenToScrollEvent();
	onScroll();
	Beach.initBackgroundTweens();

	animate();

})();




