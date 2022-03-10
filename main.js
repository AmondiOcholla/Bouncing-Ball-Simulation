var canvas, ctx, container;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
var ball;
var message = "bouncing ball simulation";

// Velocity x
var vx = 5.0;
// Velocity y
var vy;
var gravity = 0.5;
var bounce = 0.5;
var xFriction = 0.1;

function init() {
  setupCanvas();
  vy = Math.random() * -15 + -5;
  ball = {
    x: canvas.width / 15,
    y: 10,
    radius: 20,
    status: 0,
    color: "maroon",
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";
  ctx.font = "20px Arial";
  ctx.fillText(message, 20, 20);

  //circle
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();

  ballMovement();
}

setInterval(draw, 1000 / 35);

function ballMovement() {
  ball.x += vx;
  ball.y += vy;
  vy += gravity;

  //wall is hit, change direction on x axis
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    vx *= -1;
  }

  // Ball hits the floor
  if (ball.y + ball.radius > canvas.height) {
    // Re-positioning on the base
    ball.y = canvas.height - ball.radius;
    //bounce the ball
    vy *= -bounce;
    //to stop bouncing ball
    if (vy < 0 && vy > -2.1) vy = 0;
    //stop ball on xaxis
    if (Math.abs(vx) < 1.1) vx = 0;

    xF();
  }
}

function xF() {
  if (vx > 0) vx = vx - xFriction;
  if (vx < 0) vx = vx + xFriction;
}

function setupCanvas() {
  container = document.createElement("div");
  container.className = "container";

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(container);
  container.appendChild(canvas);

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
}
