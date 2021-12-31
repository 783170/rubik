var s;
var c = [];
var duration = 0;
var rotationDirection = true;
var xRotation = -30;
var yRotation =  30;

function setup() {
  createCanvas (windowWidth, windowHeight,WEBGL);
  
  angleMode(DEGREES);
  
  if (width < height) s = width/250;
  else s = height/250;
  
  rectMode(CENTER);
  
  let temp = 0;
  for (let w = -1; w <= 1; w++)
    for (let f = -1; f <= 1; f++)
      for (let b = -1; b <= 1; b++)
        c[temp++] = new Cube(w*40*s,f*40*s,b*40*s,40*s);
}

function draw() {
  background("#DED4C8");
  
  if (rotationDirection) xRotation = mouseX - yRotation;
  else                   yRotation = mouseX - xRotation;
  rotateX(xRotation);
  rotateY(yRotation);
  
  for (let i = 0; i < c.length; i++)
    c[i].drawCube();
  
  if (frameCount%50 == 0)
    duration = 15;
  if (duration > 0) {
    c[14].drawSide(c[14].x,c[14].y,c[14].z+c[14].s/2+s,0,c[14].s,c[14].s,0);
    duration--;
  }
}

class Cube {
  constructor (x,y,z,size){
    this.x = x;
    this.y = y;
    this.z = z;
    this.s = size;
    this.colors = ["#0045ad"/*blue*/,"#009b48"/*green*/,"#b90000"/*red*/,"#ff5900"/*orange*/,"#ffd500"/*yellow*/,"#ffffff"/*white*/];
  }
  drawSide (t1,t2,t3,color,b1,b2,b3) {
    push();
    translate(t1,t2,t3);
    fill(color);
    box(b1,b2,b3);
    pop();
  }
  drawCube () {
    push();
    stroke(0);
    strokeWeight(2);
    translate(this.x,this.y,this.z);
    
    this.drawSide(-this.s/2,0,0,this.colors[0],0,this.s,this.s);
    this.drawSide( this.s/2,0,0,this.colors[1],0,this.s,this.s);
    this.drawSide(0,-this.s/2,0,this.colors[2],this.s,0,this.s);
    this.drawSide(0, this.s/2,0,this.colors[3],this.s,0,this.s);
    this.drawSide(0,0,-this.s/2,this.colors[4],this.s,this.s,0);
    this.drawSide(0,0, this.s/2,this.colors[5],this.s,this.s,0);
    pop();
  }
}

function turnCube (key) {
         if (key === RIGHT_ARROW) {
    rotateFace(2 ,1 ,0 ,9 ,18,19,20,11,  2,0,4,1,5);
    rotateFace(5 ,4 ,3 ,12,21,22,23,14,  3,0,4,1,5);
    rotateFace(8 ,7 ,6 ,15,24,25,26,17,  3,0,4,1,5);
  } else if (key === LEFT_ARROW) { 
    rotateFace(2 ,11,20,19,18,9 ,0 ,1 ,  2,5,1,4,0);
    rotateFace(5 ,14,23,22,21,12,3 ,4 ,  3,5,1,4,0);
    rotateFace(8 ,17,26,25,24,15,6 ,7 ,  3,5,1,4,0);
  } else if (key === UP_ARROW) {
    rotateFace(2 ,5 ,8 ,7 ,6 ,3 ,0 ,1 ,  0,5,3,4,2);
    rotateFace(11,14,17,16,15,12,9 ,10,  1,5,3,4,2);
    rotateFace(20,23,26,25,24,21,18,19,  1,5,3,4,2);
  } else if (key === DOWN_ARROW) {
    rotateFace(2 ,1 ,0 ,3 ,6 ,7 ,8 ,5 ,  0,2,4,3,5);
    rotateFace(11,10,9 ,12,15,16,17,14,  1,2,4,3,5);
    rotateFace(20,19,18,21,24,25,26,23,  1,2,4,3,5);
  }
}
function rotateFace (c1,s1,c2,s2,c3,s3,c4,s4,  col0,col1,col2,col3,col4) {
    let temp           = c[c1].colors[col0];
    c[c1].colors[col0] = c[c2].colors[col0];
    c[c2].colors[col0] = c[c3].colors[col0];
    c[c3].colors[col0] = c[c4].colors[col0];
    c[c4].colors[col0] = temp;
    
    temp               = c[s1].colors[col0];
    c[s1].colors[col0] = c[s2].colors[col0];
    c[s2].colors[col0] = c[s3].colors[col0];
    c[s3].colors[col0] = c[s4].colors[col0];
    c[s4].colors[col0] = temp;
    
    let temp0          = c[c1].colors[col1];
    let temp1          = c[s1].colors[col1];
    let temp2          = c[c2].colors[col1];
    c[c1].colors[col1] = c[c2].colors[col2];
    c[s1].colors[col1] = c[s2].colors[col2];
    c[c2].colors[col1] = c[c3].colors[col2];
    c[c2].colors[col2] = c[c3].colors[col3];
    c[s2].colors[col2] = c[s3].colors[col3];
    c[c3].colors[col2] = c[c4].colors[col3];
    c[c3].colors[col3] = c[c4].colors[col4];
    c[s3].colors[col3] = c[s4].colors[col4];
    c[c4].colors[col3] = c[c1].colors[col4];
    c[c4].colors[col4] = temp0;
    c[s4].colors[col4] = temp1;
    c[c1].colors[col4] = temp2;
}
function keyPressed () {
       if (key === 't') rotateFace(2 ,1 ,0 ,9 ,18,19,20,11,  2,0,4,1,5);
  else if (key === 'y') rotateFace(2 ,11,20,19,18,9 ,0 ,1 ,  2,5,1,4,0);
  else if (key === 'g') rotateFace(2 ,11,20,23,26,17,8 ,5 ,  5,2,1,3,0);
  else if (key === 'h') rotateFace(2 ,5 ,8 ,17,26,23,20,11,  5,0,3,1,2);
  else if (key === 'n') rotateFace(8 ,7 ,6 ,15,24,25,26,17,  3,0,4,1,5);
  else if (key === 'b') rotateFace(8 ,17,26,25,24,15,6 ,7 ,  3,5,1,4,0);
  
  else if (key === 'd') rotateFace(2 ,5 ,8 ,7 ,6 ,3 ,0 ,1 ,  0,5,3,4,2);
  else if (key === 'f') rotateFace(2 ,1 ,0 ,3 ,6 ,7 ,8 ,5 ,  0,2,4,3,5);
  else if (key === 'k') rotateFace(20,23,26,25,24,21,18,19,  1,5,3,4,2);
  else if (key === 'j') rotateFace(20,19,18,21,24,25,26,23,  1,2,4,3,5);
  
  if (((keyCode === RIGHT_ARROW)||(keyCode === LEFT_ARROW))||((keyCode === UP_ARROW)||(keyCode === DOWN_ARROW)))
    turnCube(keyCode);
}
function mouseClicked () {
  rotationDirection = !rotationDirection;
}
