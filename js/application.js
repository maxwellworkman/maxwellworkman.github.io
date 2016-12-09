


function draw() {
  var c = document.getElementById("timebeach");
  ctx = c.getContext("2d");
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  //...drawing code...
  drawSky();

}

function drawSky() {
  ctx.beginPath();
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "red";
  ctx.fill();
}