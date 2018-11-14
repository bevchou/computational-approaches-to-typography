//GLOBAL VARIABLES
let text = [];
let compText;
let lines;
let words;
let letters;
let topMargin = 60;
let leftMargin = 100;
let width = 400;
let height = 180;
let numEyes = 25;


function preload() {
  //source - one line from bluets by maggie nelson, pg 14
  text = loadStrings('poem.txt');
}


function setup() {
  let poem = document.getElementById('poem');
  poem.style.fontSize = "16px";
  noCanvas();

  //use my text to array class to parse through text file
  compText = new TextToArray(text);
  words = compText.makeWordArray();
  for (let i = 0; i < words.length; i++) {
    let eachP = document.createElement('p');
    poem.appendChild(eachP);
    eachP.innerHTML = words[i];
    eachP.style.position = 'absolute';
    eachP.style.left = leftMargin + i * 50 + "px";
    eachP.style.top = topMargin + i * 20 + "px";
    eachP.style.transform = "rotate(" + 5 + i * 55 + "deg)";
  }
  for (let j = 0; j < numEyes; j++) {
    for (let i = 0; i < numEyes; i++) {
      let eyes = document.createElement('p');
      eyes.innerHTML = "i";
      document.body.appendChild(eyes);
      eyes.style.position = 'absolute';
      eyes.style.fontSize = '8px';
      eyes.style.color = 'blue';
      eyes.style.left = leftMargin + width / numEyes * i + "px";
      eyes.style.top = topMargin + height / numEyes * j + "px";
    }
  }



}


function draw() {
  //don't loop
  noLoop();
}
