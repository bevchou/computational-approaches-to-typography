

//GLOBAL VARIABLES
//current position of last "word"
let cursorX;
let currentWordWidth;
let marginSide = 50;
let marginTop = 50;
let pageW = 500;
let pageH = 600;
let spaceWidth = 10;
let lineHeight = 55;
let numRows = 10;

function setup() {
  alert('click to generate new writings.');
  createCanvas(pageW, pageH);
  strokeWeight(1.75);
  stroke(188, 58, 22);
  noFill();

}

// for (let i = 0; i < 7; i++) {
//   translate(0, i*lineHeight);

function draw() {
  background(247, 239, 227);
  push();
  for (let i = 0; i < numRows; i++) {
    hightlight(lineHeight * i + marginTop - 20);
    //track position of text on canvas
    cursorX = marginSide;
    //next line (move if after the first line)
    if (i > 0) {
      translate(0, lineHeight);
    }
    //draw a row of text
    makeRow();
  }
  pop();

  //don't loop
  noLoop();
}

//function to create a scribble
//draws a sine wave that is determined by randomly selected amplitude and angle
function makeWord() {
  let amplitude = [];
  let theta = [];
  let totalTime = 0;

  //select a random number of random amplitude and angle values
  let length = int(random(5, 22));
  for (let i = 0; i < length; i++) {
    amplitude.push(random(1, 20));
    theta.push(random(0, 2 * PI));
  }

  //begin drawing the line
  beginShape();
  for (let i = 0; i < length; i++) {
    //how long to plot this sine wave
    let time = int(random(1, 20));
    //shift over to next sine wave
    totalTime = totalTime + time;
    //plot the since wave
    for (let j = 0; j < time; j += 4) {
      curveVertex(totalTime + j, amplitude[i] * sin(theta[i]));
    }
  }
  endShape();
  currentWordWidth = totalTime;
}

function makeRow() {
  push();
  //start position
  translate(marginSide - 35, marginTop);
  //space available in each row for writing
  let widthWriteSpace = pageW - 2 * marginSide - 20;
  //write while there's still width space
  while (cursorX < widthWriteSpace) {
    makeWord();
    //track new position
    //moveCursor is the amount to move the cursor
    let moveCursor = currentWordWidth + spaceWidth;
    cursorX += moveCursor;
    //if the word is too big to fit, push it off the page
    if (cursorX > widthWriteSpace) {
      translate(999999999, 0);
      cursorX += 999999999;
      break;
    }
    translate(moveCursor, 0);
  }
  pop();
}

function hightlight(startRow) {
  //random select to highlight or not
  let doHighlight = int(random(0, 2));
  if (doHighlight) {
    startX = random(0.2, 0.5) * pageW - marginSide;
    push();
    noStroke();
    fill(87, 82, 183, 155);
    rect(startX, startRow, random(0.2, 0.8) * (pageW - 2 * marginSide), 42);
    pop();
  }
}

//switch it up when you click the mouse
function mousePressed() {
  draw();
}
