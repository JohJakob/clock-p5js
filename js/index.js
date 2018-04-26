// Declare global variables

var backgroundColor, hourScaleColor, minuteScaleColor, hourHandColor, minuteHandColor, secondHandColor;
var hourScaleStrokeWeight, minuteScaleStrokeWeight, hourHandStrokeWeight, minuteHandStrokeWeight, secondHandStrokeWeight;
var clockSize, longestSide;

function setup() {
  // Create canvas and set modes

  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);

  setSizes();
  setColors();
}

function draw() {
  background(backgroundColor);

  // Transform coordinate system

  push();
  translate(width / 2, height / 2);
  rotate(-90);

  // Draw hour scale

  drawHourScale();

  pop();
}

function windowResized() {
  // Resize canvas and recalculate relative sizes

  resizeCanvas(windowWidth, windowHeight);
  setSizes();
}

function setSizes() {
  // Set the clock size based on the longest side

  if (width < height) {
    clockSize = width / 2 - width / 10;
    longestSide = width;
  } else {
    clockSize = height / 2 - height / 10;
    longestSide = height;
  }
}

function setColors() {
  // Set the initial colors

  backgroundColor = color(0);
  hourScaleColor = color(255);
  hourScaleStrokeWeight = 5;
}

function drawHourScale() {
  push();

  // Draw 12 lines as the hour scale

  for (var i = 0; i < 12; i++) {
    stroke(hourScaleColor);
    strokeWeight(hourScaleStrokeWeight);
    line(clockSize, 0, clockSize - longestSide / 20, 0);
    rotate(30);
  }

  pop();
}