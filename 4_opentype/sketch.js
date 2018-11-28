
//based on Allison Parrish's example on loading and drawing font outlines
//https://editor.p5js.org/allison.parrish/sketches/BklobgCO67

//used inconsolata regular from Google Fonts Github Repo
//https://github.com/googlefonts/Inconsolata/blob/master/fonts/otf/Inconsolata-Regular.otf

let font;
let fontData;
let multiplierX;
let multiplierY;

function drawPathOutlineMouseFollow(cmds) {
  // current pen position
  let cx = 0;
  let cy = 0;
  // start position of current contour
  let startX = 0;
  let startY = 0;
  for (let cmd of cmds) {
    switch (cmd.type) {
      case 'M':
        //move pen
        startX = cmd.x;
        startY = cmd.y;
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'L':
        //draw bezier instead of a line and warp it based on the multiplier values calcualted in the draw function
        // line(cx, cy, cmd.x, cmd.y);
        bezier(cx, cy, cx * multiplierX, cy * multiplierY, cmd.x * multiplierX, cmd.y * multiplierY, cmd.x, cmd.y);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'C':
        //draw bezier curve (otf)
        bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        // line(cx, cy, cmd.x, cmd.y);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Q':
        //draw quadratic curve (ttf)
        beginShape();
        vertex(cx, cy);
        quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        endShape();
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Z':
        // to complete path
        line(cx, cy, startX, startY);
        break;
    }
  }
}

function drawPathOutlineClickExpand(cmds) {
  // current pen position
  let cx = 0;
  let cy = 0;
  // start position of current contour
  let startX = 0;
  let startY = 0;
  for (let cmd of cmds) {
    switch (cmd.type) {
      case 'M':
        //move pen
        // startX = cmd.x;
        // startY = cmd.y;
        startX = cmd.x;
        startY = cmd.y;
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'L':
        //draw line to this position
        //translate further based on how many times the user clicks on the page
        let translateLine = {x: mouseCount*5, y: mouseCount*5};
        line(cx + translateLine.x, cy + translateLine.y, cmd.x+translateLine.x, cmd.y+translateLine.y);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'C':
        //draw bezier curve (otf)
        //translate further based on how many times the user clicks on the page, move in opposite direction of lines
        let translateBez = {x: -mouseCount*5, y: -mouseCount*5};
        bezier(cx + translateBez.x, cy+ translateBez.y, cmd.x1+ translateBez.x, cmd.y1+ translateBez.y, cmd.x2+ translateBez.x, cmd.y2+ translateBez.y, cmd.x+ translateBez.x, cmd.y+ translateBez.y);
        // line(cx, cy, cmd.x, cmd.y);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Q':
        //draw quadratic curve (ttf)
        beginShape();
        vertex(cx, cy);
        quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
        endShape();
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Z':
        // to complete path
        line(cx, cy, startX, startY);
        break;
    }
  }
}


function preload() {
  fontData = loadBytes('Inconsolata-Regular.otf');
}

let path;

function setup() {
  createCanvas(600, 600);
  font = opentype.parse(fontData.bytes.buffer);
  path = font.getPath("Brown fox", 0, 0, 72);
}

function draw() {
  background(255);

  //plain text
  push();
  translate(70, 125);
  path.draw(drawingContext); // opentype.js
  pop();

  //bezier mouse follow
  //min and max multiplier values
  let minMult = 0.1;
  let maxMult = 1.9
  //map mouse position to multiplier values
  multiplierX = map(mouseX, 0, width, minMult, maxMult);
  multiplierY = map(mouseY, 0, height, maxMult, minMult);

  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  translate(70, 225);
  drawPathOutlineMouseFollow(path.commands); // p5js
  pop();


  //expand letters w/ click
  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  translate(70, 325);
  drawPathOutlineClickExpand(path.commands); // p5js
  pop();


  // noLoop();

}

//track number of mouse clicks
let mouseCount = 0;
function mousePressed() {
  mouseCount++;
  // loop();
  console.log(mouseCount);
}
