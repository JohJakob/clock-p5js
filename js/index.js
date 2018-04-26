// Declare global variables

var backgroundColor, hourScaleColor, minuteScaleColor, hourHandColor, minuteHandColor, secondHandColor;
var hourScaleStrokeWeight, minuteScaleStrokeWeight, hourHandStrokeWeight, minuteHandStrokeWeight, secondHandStrokeWeight;
var clockRadius, longestSide;

function setup() {
  // Create canvas and set modes

  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);

  setSizes();
  setColorsAndWeights();
}

function draw() {
  background(backgroundColor);

  // Transform coordinate system

  push();
  translate(width / 2, height / 2);
  rotate(-90);

  drawHourScale();
  drawMinuteScale();

  drawHourHand();
  drawMinuteHand();

  pop();
}

function windowResized() {
  // Resize canvas and recalculate relative sizes

  resizeCanvas(windowWidth, windowHeight);
  setSizes();
}

function setSizes() {
  // Set the clock radius based on the longest side

  if (width < height) {
    clockRadius = width / 2 - width / 10;
    longestSide = width;
  } else {
    clockRadius = height / 2 - height / 10;
    longestSide = height;
  }
}

function setColorsAndWeights() {
  // Set the initial colors and stroke weights

  backgroundColor = color(0, 0, 0);

  hourScaleColor = color(0, 0, 100);
  hourScaleStrokeWeight = 5;

  minuteScaleColor = color(0, 0, 100);
  minuteScaleStrokeWeight = 1;

  hourHandColor = color(0, 0, 50);
  hourHandStrokeWeight = 20;

  minuteHandColor = color(0, 0, 100);
  minuteHandStrokeWeight = 10;
}

function drawHourScale() {
  push();

  // Draw 12 lines as the hour scale

  for (var i = 0; i < 12; i++) {
    stroke(hourScaleColor);
    strokeWeight(hourScaleStrokeWeight);
    line(clockRadius, 0, clockRadius - longestSide / 20, 0);
    rotate(30);
  }

  pop();
}

function drawMinuteScale() {
  push();

  // Draw 60 lines as the minute scale

  for (var i = 0; i < 60; i++) {
    stroke(minuteScaleColor);
    strokeWeight(minuteScaleStrokeWeight);
    line(clockRadius, 0, clockRadius - longestSide / 40, 0);
    rotate(6);
  }

  pop();
}

function drawHourHand() {
  push();

  // Set the rotation based on the current hour and the current minute (to move the hour hand smoothly between hours)

  var rotation = map(hour(), 0, 24, 0, 360 * 2) + map(minute(), 0, 60, 0, 360 / 12);

  rotate(rotation);
  
  // Draw the hour hand

  stroke(hourHandColor);
  strokeWeight(hourHandStrokeWeight);
  strokeCap(SQUARE);
  line(0, 0, clockRadius - longestSide / 8, 0);

  pop();
}

function drawMinuteHand() {
  push();

  // Set the rotation based on the current minute and the current second (to move the minute hand smoothly between minutes)

  var rotation = map(minute(), 0, 60, 0, 360) + map(second(), 0, 60, 0, 360 / 60);

  rotate(rotation);

  // Draw the minute hand

  stroke(minuteHandColor);
  strokeWeight(minuteHandStrokeWeight);
  strokeCap(SQUARE);
  line(0, 0, clockRadius - longestSide / 15, 0);

  pop();
}