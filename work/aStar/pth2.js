// this is nothing but the new branch

var wid,hei;
if (innerWidth < innerHeight) {
  wid = innerWidth;
} else {
  wid = innerWidth/2;
}
hei = wid;
// control
{
var numHei = 30;
var wdth = wid/numHei;
var numWid = Math.floor(wid/wdth);
var tcolor = "black";
var mcolor = "rgb(0,0,0)";
var obsPerc = 0.5;
var sqrs = [];
var st = [ 0     , 0 ];
var ed = [ numHei-1 , numWid-1     ];
}
// gridizing
{
var done = false;
var openSet,current,cameFrom;
var start,end;
function setup(){
  createCanvas(wid,hei);
  background(0);
  for (let w = 0; w < numHei; w++) {
    let row = [];
    for (let z = 0; z < numWid; z++) {
      let sqr = {
        vsd: false,
        i: w,
        j: z,
        top:true,right:true,left:true,bottom:true,
        topR:true,topL:true,btmR:true,btmL:true,
        f: 0,
        g: 0,
        closed: false,
        check(){
          if (this.i == 0){
            this.top = false;
            this.topR = false;
            this.topL = false;
          }
          else if (this.i == numHei-1){
            this.bottom = false;
            this.btmL = false;
            this.btmR = false;
          }
          if (this.j == 0){
            this.left = false;
            this.topL = false;
            this.btmL = false;
          }
          else if (this.j == numWid-1){
            this.right = false;
            this.topR = false;
            this.btmR = false;
          }
        },
      }
      sqr.check();
      row.push(sqr);
      
    }
    sqrs.push(row);
  }
  //adding neighbours to each block
  for (var i = 0; i < numHei; i++) {
    for (var j = 0; j < numWid; j++) {
      let routes = [];
      let dgnls = [];
      let s = sqrs[i][j];
      if (s.top) {
        routes.push(sqrs[i-1][j]);
      }
      if (s.bottom) {
        routes.push(sqrs[i+1][j]);
      }
      if (s.right) {
        routes.push(sqrs[i][j+1]);
      }
      if (s.left) {
        routes.push(sqrs[i][j-1]);
      }
      if (s.topR) {
        routes.push(sqrs[i-1][j+1]);
        dgnls.push(sqrs[i-1][j+1]);
      }
      if (s.btmR) {
        routes.push(sqrs[i+1][j+1]);
        dgnls.push(sqrs[i+1][j+1]);
      }
      if (s.topL) {
        routes.push(sqrs[i-1][j-1]);
        dgnls.push(sqrs[i-1][j-1]);
      }
      if (s.btmL) {
        routes.push(sqrs[i+1][j-1]);
        dgnls.push(sqrs[i+1][j-1]);
      }
      s.routes = routes;
      s.dgnl = dgnls;
    }
  }

  start = sqrs[ st[0] ][ st[1] ];
  end = sqrs[ ed[0] ][ ed[1] ];
  obs(sqrs,start,end);
  Set.prototype.peek = function(){
    let tmpF = Infinity;
    let ans = null;
    for (var elem in this) {
      if (this.hasOwnProperty(elem)) {
        let temp = this[elem];
        if (temp[temp.length-1].f < tmpF) {
          tmpF = temp[temp.length-1].f;
          ans = temp;
        }
      }
    }
    if (ans) return ans[ans.length-1];
    else return null;
  }
  Set.prototype.empty = function(){
    let all = Object.keys(this);
    if (all.length == 0) {
      return true;
    }
    return false;
  };
  openSet = new Set();
  current = start;
  current.g = 0;
  current.f = fScore(current,end);
  openSet[[current.i,current.j]] = [current];
  cameFrom = [current];
}
}
// animation and visuals
{
function rmvLine(x,y){
  strokeWeight(wdth/4);
  stroke(0,75,0);
  line(x.j*wdth+wdth/2 , x.i*wdth+wdth/2 , y.j*wdth+wdth/2 , y.i*wdth+wdth/2)
}
function connect(stack){
  strokeWeight(wdth/4);
  stroke(255);
  for (let i = 0; i < stack.length-1; i++) {
    let f = stack[i];
    let s = stack[i+1];
    line(f.j*wdth+wdth/2,f.i*wdth+wdth/2,s.j*wdth+wdth/2,s.i*wdth+wdth/2);
  }
}
function disconnect(stack){
  for (let i = 0; i < stack.length-1; i++) {
    rmvLine(stack[i],stack[i+1])
  }
}
function obs(sqrs,start,end){
  fill(100,25,0);
  stroke(100,25,0)
  for (let i = 0; i < obsPerc*(numWid*numHei)-2; i++) {
    let no = sqrs[floor(random(numHei))][floor(random(numWid))];
    if (no == start || no == end) {
      i--;
      continue;
    }
    if (no.closed) {
      i--;
      continue;
    }
    no.closed = true;
    ellipse(no.j*wdth+wdth/2,no.i*wdth+wdth/2,wdth,wdth);
  }
}
}
// routing
{
function yGscore(x,y){
  if (x.dgnl.includes(y)) {
    return x.g + Math.hypot(1,1);
  }
  return x.g+1;
}
function hScore(x,y = end){
  return Math.hypot( Math.abs(y.i - x.i) , Math.abs(y.j - x.j) );
}
function fScore(x,y = end){
  return x.g + hScore(x,y);
}
function addNebors(x,stack,openSet,end){
  var min = null;
  var tempF = Infinity;
  for (var neb of x.routes) {
      if (neb.closed || neb.vsd) continue;
      else if (openSet[[neb.i,neb.j]]) {
        if (neb.g >= yGscore(x,neb)) delete openSet[[neb.i,neb.j]];
        else continue;
      }
      if (x.dgnl.includes(neb)) neb.g = x.g + Math.hypot(1,1);
      else neb.g = x.g + 1;
      neb.f = fScore(neb,end);
      let loc = [neb.i,neb.j];
      openSet[loc] = [...stack];
      openSet[loc].push(neb);
      if (neb.f < tempF){
        min = neb;
        tempF = neb.f;
      }
  }
  return min;
}
}



function draw(){
  if (!openSet.empty() && current != end) {
    current.vsd = true;
    delete openSet[[current.i,current.j]];
    let minNbr = addNebors(current,cameFrom,openSet,end);
    let temp = openSet.peek();
    if (temp && minNbr && minNbr.f <= temp.f) {
      stroke(255);
      noFill();
      strokeWeight(wdth/4);
      line(current.j*wdth+wdth/2,current.i*wdth+wdth/2,minNbr.j*wdth+wdth/2,minNbr.i*wdth+wdth/2);
      cameFrom.push(minNbr);
      current = minNbr;
    } else {
      disconnect(cameFrom);
      cameFrom = openSet[[temp.i,temp.j]];
      connect(cameFrom);
      current = temp;
    }
  } else {
    if (current === end) connect(cameFrom);
    else disconnect(cameFrom);
    noLoop();
  }
}
