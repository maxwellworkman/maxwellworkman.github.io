var colorPalette = {
	morning: { sky: "", beach: "", ocean: "", orb: "" },
	daytime: { sky: "", beach: "", ocean: "", orb: "" },
	evening: { sky: "", beach: "", ocean: "", orb: "" },
	night: { sky: "hsl(219, 80%, 14%)", lightSky: "hsl(219, 80%, 30%)",beach: "", ocean: "", orb: "",  }
}

var time = "night";

switch(time) {
	case "morning":
		var palette = colorPalette.morning;
		break;
	case "daytime":
		var palette = colorPalette.daytime;
		break;
	case "evening":
		var palette = colorPalette.evening;
		break;
	case "night":
		var palette = colorPalette.night;
		break;
}

var c
var ctx,
Beach = {
  	init: function() {
  		c = document.getElementById("timebeach");
  		ctx = c.getContext("2d");
  		ctx.canvas.width  = window.innerWidth;
  		ctx.canvas.height = window.innerHeight;
  	},
  	drawSky: function() {
  		var smallerCirc = ctx.canvas.width/50;
  		var largerCirc = ctx.canvas.width-ctx.canvas.width/1.6;
  		var moonX = ctx.canvas.width/2;
  		var moonY = ctx.canvas.height/4;
  		var grd=ctx.createRadialGradient(moonX,moonY,smallerCirc,moonX,moonY,largerCirc);
		grd.addColorStop(0,palette.lightSky);
		grd.addColorStop(1,palette.sky);
		ctx.fillStyle=grd;
		ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height/2);
  	},
  	drawOcean: function() {
  		var grd=ctx.createLinearGradient();
  		ctx.fillRect(0,(ctx.canvas.height/2)-1,ctx.canvas.width,ctx.canvas.height)
  	}
}

function run() {
	Beach.init();
	Beach.drawSky();
}