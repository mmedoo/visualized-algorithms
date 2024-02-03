//variables
{
  var num = 20;
  var gspeed = 0;
  var tspeed = 0;
  var b = 3;
  var tcolor = "red";
  var mcolor = "black";
  var wid = 500;
  var hei = 500;
}

//constants
{
  var unitW = wid/num;
  var st = [];
  var sqrs = [];
  var unvsd = [];
  var current;
  var prev = null;
  var stackG;
  var done = false;
  var ix,iy,go = false;
}

function setup(){
  createCanvas(500,500);
  rectMode(CENTER);
  background(0);
  strokeWeight(1);
}

//functions
{
function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
function radar(x){
  if (x.around.bottom && sqrs[x.pos.i][x.pos.j+1].vsd) {
    x.around.bottom = false;
  }
  if (x.around.top && sqrs[x.pos.i][x.pos.j-1].vsd) {
    x.around.top = false;
  }
  if (x.around.right && sqrs[x.pos.i+1][x.pos.j].vsd) {
    x.around.right = false;
  }
  if (x.around.left && sqrs[x.pos.i-1][x.pos.j].vsd) {
    x.around.left = false;
  }
}
function checkNebor(x) {
  if (x.around.top){
    unvsd.push(sqrs[x.pos.i][x.pos.j-1]);
  }
  if (x.around.right){
    unvsd.push(sqrs[x.pos.i+1][x.pos.j]);
  }
  if (x.around.left){
    unvsd.push(sqrs[x.pos.i-1][x.pos.j]);
  }
  if (x.around.bottom){
    unvsd.push(sqrs[x.pos.i][x.pos.j+1]);
  }
}
function rmvBord(x,y) {
  noFill();
  stroke(0);
  if (x.pos.i - y.pos.i == -1){
    for (var i = 0; i < 10; i++) {
      line(unitW*x.pos.i+unitW,unitW*x.pos.j+2,unitW*x.pos.i+unitW,unitW*x.pos.j+unitW-2);
    }
  }
  else if (x.pos.i - y.pos.i == 1){
    for (var i = 0; i < 10; i++) {
      line(unitW*y.pos.i+unitW,unitW*y.pos.j+2,unitW*y.pos.i+unitW,unitW*y.pos.j+unitW-2);
    }
  }
  else if (x.pos.j - y.pos.j == 1){
    for (var i = 0; i < 10; i++) {
      line(unitW*x.pos.i+2,unitW*x.pos.j,unitW*x.pos.i+unitW-2,unitW*x.pos.j);
    }
  }
  else {
        for (var i = 0; i < 10; i++) {
      line(unitW*y.pos.i+2,unitW*y.pos.j,unitW*y.pos.i+unitW-2,unitW*y.pos.j);
    }
  }
}
function backG(x,y){
  stroke(0,0,0,0);
  if (y) fill(255,0,0);
  else fill(0);
  rect(unitW*(x.pos.i+1/2),unitW*(x.pos.j+1/2),unitW-2,unitW-2);
  rect(unitW*(x.pos.i+1/2),unitW*(x.pos.j+1/2),unitW-2,unitW-2);
}
}


function mouseMoved(){
  ix = floor(mouseX/unitW);
  iy = floor(mouseY/unitW);
}
function mousePressed(){
  if (mouseX <= wid && mouseY <= hei && mouseX >= 0 && mouseY >= 0 && !go){
    st[0] = floor(mouseX/unitW);
    st[1] = floor(mouseY/unitW);
    current = sqrs[st[0]][st[1]];
    stackG = [current];   
    go = true;
  }
}


function draw(){
    if (!go) {
      background(0);
      for (let i = 0; i < num; i++) {
        fill(150,75,0);
        stroke(255);
        var row = [];
        for (let j = 0; j < num; j++) {
          let sqr = {
            pos: {i: i,j: j},
            around: {top:true,
                     right:true,
                     left:true,
                     bottom:true},
            check(){
              if (this.pos.i == 0) this.around.left = false;
              else if (this.pos.i == num-1) this.around.right = false;
              if (this.pos.j == 0) this.around.top = false;
              else if (this.pos.j == num-1) this.around.bottom = false;
            },
            vsd: false,
            routes: [],
          }
          sqr.check();
          row.push(sqr);
          rect(unitW*(i+1/2),unitW*(j+1/2),unitW,unitW);
        }
        sqrs.push(row);
      }
      stroke(0,0,0,0);
      fill(255,0,0);
      rect(unitW*(ix+1/2),unitW*(iy+1/2),unitW-2,unitW-2);   
    } else {
      stroke(255);
      frameRate(15);
      if (stackG[0] != null) {
          current.vsd = true;
          backG(current,true);
          unvsd = [];
          radar(current);
          checkNebor(current);
          if (unvsd[0] != null) {
              stackG.push(current);
              let next = unvsd[rnd(0,unvsd.length-1)];
              if (prev) rmvBord(prev,current);
              current.routes.push(next);
              next.routes.push(current);
              if (prev) backG(prev,false);
              prev = current;
              current = next;
          } else if (stackG[0] != null){
              if (prev) backG(prev,false);
              if (prev) rmvBord(prev,current);
              prev = current;
              current = stackG.pop();
          }
      } else {
        noLoop();
      }
    }
}