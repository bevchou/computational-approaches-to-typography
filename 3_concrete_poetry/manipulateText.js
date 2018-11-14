class manipulateText {
  constructor(array, x, y) {
    //pass to class
    this.array = array;
    this.x = x;
    this.y = y;
    //internal variables
    this.fontsize = 20;
  }
  tilt(ypos) {
    push();
    this.angle = move(this.angle, this.angleSpeed);
    this.angle = restart(this.angle, -PI / 6, PI / 6);
    //this.angleSpeed = bounce(this.angle, this.angleSpeed, -PI/6, PI/6);
    let spacing = width / (this.array.length - 1);
    shearX(this.angle);
    for (let i = 0; i < this.array.length; i++) {
      text(this.array[i], spacing * i, ypos);
    }
    pop();
  }
  scroll(textbox, scrollspeed) {
    push();
    translate(textbox.rectx, textbox.recty);
    this.yspeed = scrollspeed;
    this.y = move(this.y, this.yspeed);
    for (let i = 0; i < this.array.length; i++) {
      text(this.array[i], textbox.rectwidth / this.array.length * i, this.y);
    }
    this.y = restart(this.y, -textbox.rectheight, textbox.rectheight*1.5);
    pop();
  }
  boundVert(textbox) {
    push();
    translate(textbox.rectx, textbox.recty);
    fill(0);
    rect(0, 0, textbox.rectwidth, -textbox.rectheight*1.5);
    rect(0, textbox.rectheight, textbox.rectwidth, textbox.rectheight*1.5);
    pop();
  }

}
