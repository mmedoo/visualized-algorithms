var n = 1;
var wid = hei = 500;
// control

var numWid = numHei = 30;
var unitWidth = wid / numHei;
var obsPerc = 0.6;
var obsList = [];
var sqrs = [];
var hoveredX,hoveredY;
var pickedStart = pickedEnd = false;
var start,end;

// gridizing

var openSet, current, cameFrom;
var start, end;

function change_messege(){
    let oldie = document.querySelector(".oldWel");
    let newie = document.querySelector(".newWel");
    oldie.classList.add("hideOld");
    newie.classList.add("showNew");
}



function mouseMoved(){

    hoveredX = floor(mouseX/unitWidth);
  
    hoveredY = floor(mouseY/unitWidth);

}

function mousePressed(){
  
    if ( (!pickedStart || !pickedEnd) && mouseX <= wid && mouseY <= hei && mouseX >= 0 && mouseY >= 0){
  
    
      startX = floor(mouseX/unitWidth);
  
      startY = floor(mouseY/unitWidth);

      if (!sqrs[startX][startY].closed){
          if (!pickedStart){
              start = sqrs[startX][startY];
              pickedStart = true;
              change_messege();
              current = start;
              current.g = 0;
              openSet[[current.i,current.j]] = [current];
              cameFrom = [current];
              current.closed = true;
          } else if (!pickedEnd && sqrs[startX][startY] != start) {
              end = sqrs[startX][startY];
              current.f = fScore(current,end);
              pickedEnd = true;
          }
      }

  
    }
  
}


function reDrawTheBoard() {
    background(100,100,100);
    strokeWeight(1);
    fill(100, 25, 0);
    stroke(100, 25, 0)
    for (const i of obsList) {
        square(unitWidth*(i.x + 0.5) , unitWidth*(i.y + 0.5) , unitWidth);
    }    
    if (pickedStart) {
        fill(10, 150, 0);
        stroke(10, 150, 0)
        circle(unitWidth*(start.i + 0.5) , unitWidth*(start.j + 0.5) , unitWidth);
    }
    if (pickedEnd) {
        fill(150, 15, 0);
        stroke(150, 15, 0)
        circle(unitWidth*(end.i + 0.5) , unitWidth*(end.j + 0.5) , unitWidth);
    }
}

var cont = document.querySelector(".cont")

function setup() {

    var cnvs = createCanvas(wid,hei);
    cnvs.parent(cont)  
    background(0);
    rectMode(CENTER)
    for (let w = 0; w < numHei; w++) {
        let row = [];
        for (let z = 0; z < numWid; z++) {
            let sqr = {
                vsd: false,
                i: w,
                j: z,
                top: true,
                right: true,
                left: true,
                bottom: true,
                topR: true,
                topL: true,
                btmR: true,
                btmL: true,
                f: 0,
                g: 0,
                closed: false,
                check() {
                    if (this.i == 0) {
                        this.top = false;
                        this.topR = false;
                        this.topL = false;
                    } else if (this.i == numHei - 1) {
                        this.bottom = false;
                        this.btmL = false;
                        this.btmR = false;
                    }
                    if (this.j == 0) {
                        this.left = false;
                        this.topL = false;
                        this.btmL = false;
                    } else if (this.j == numWid - 1) {
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
                routes.push(sqrs[i - 1][j]);
            }
            if (s.bottom) {
                routes.push(sqrs[i + 1][j]);
            }
            if (s.right) {
                routes.push(sqrs[i][j + 1]);
            }
            if (s.left) {
                routes.push(sqrs[i][j - 1]);
            }
            if (s.topR) {
                routes.push(sqrs[i - 1][j + 1]);
                dgnls.push(sqrs[i - 1][j + 1]);
            }
            if (s.btmR) {
                routes.push(sqrs[i + 1][j + 1]);
                dgnls.push(sqrs[i + 1][j + 1]);
            }
            if (s.topL) {
                routes.push(sqrs[i - 1][j - 1]);
                dgnls.push(sqrs[i - 1][j - 1]);
            }
            if (s.btmL) {
                routes.push(sqrs[i + 1][j - 1]);
                dgnls.push(sqrs[i + 1][j - 1]);
            }
            s.routes = routes;
            s.dgnl = dgnls;
        }
    }

    obs(sqrs);
    Set.prototype.peek = function() {
        let tmpF = Infinity;
        let ans = null;
        for (var elem in this) {
            if (this.hasOwnProperty(elem)) {
                let temp = this[elem];
                if (temp[temp.length - 1].f < tmpF) {
                    tmpF = temp[temp.length - 1].f;
                    ans = temp;
                }
            }
        }
        if (ans) return ans[ans.length - 1];
        else return null;
    }
    Set.prototype.empty = function() {
        let all = Object.keys(this);
        if (all.length == 0) {
            return true;
        }
        return false;
    };
    openSet = new Set();
}

// animation and visuals

function rmvLine(x, y) {
    line(x.i * unitWidth + unitWidth / 2, x.j * unitWidth + unitWidth / 2, y.i * unitWidth + unitWidth / 2, y.j * unitWidth + unitWidth / 2)
}

function connect(stack) {
    strokeWeight(unitWidth / 4);
    stroke(255);
    for (let i = 0; i < stack.length - 1; i++) {
        let f = stack[i];
        let s = stack[i + 1];
        line(f.i * unitWidth + unitWidth / 2, f.j * unitWidth + unitWidth / 2, s.i * unitWidth + unitWidth / 2, s.j * unitWidth + unitWidth / 2);
    }
}

function disconnect(stack) {
    strokeWeight(unitWidth / 10);
    stroke(0, 75, 0);
    for (let i = 0; i < stack.length - 1; i++) {
        rmvLine(stack[i], stack[i + 1])
    }
}

function obs(sqrs) {
    fill(100, 25, 0);
    stroke(100, 25, 0)
    for (let i = 0; i < obsPerc * (numWid * numHei) - 2; i++) {
        let x = floor(random(numHei));
        let y = floor(random(numWid));
        if (sqrs[x][y].closed) continue;
        obsList.push({x:x,y:y});
        sqrs[x][y].closed = true;
    }
}

// routing

function yGscore(x, y) {
    if (x.dgnl.includes(y)) {
        return x.g + Math.hypot(1, 1);
    }
    return x.g + 1;
}

function hScore(x, y = end) {
    return Math.hypot(Math.abs(y.i - x.i), Math.abs(y.j - x.j));
}

function fScore(x, y) {
    return x.g + hScore(x, y);
}

function addNebors(x, stack, openSet, end) {
    var min = null;
    var tempF = Infinity;
    for (var neb of x.routes) {
        if (neb.closed || neb.vsd) continue;
        if (openSet[[neb.i, neb.j]]) {
            if (neb.g >= yGscore(x, neb)) delete openSet[[neb.i, neb.j]];
            else continue;
        }
        if (x.dgnl.includes(neb)) neb.g = x.g + Math.hypot(1, 1);
        else neb.g = x.g + 1;
        neb.f = fScore(neb, end);
        let loc = [neb.i, neb.j];
        openSet[loc] = [...stack];
        openSet[loc].push(neb);
        if (neb.f < tempF) {
            min = neb;
            tempF = neb.f;
        }
    }
    return min;
}


function draw() {
    // frameRate(n)
    if (!pickedStart || !pickedEnd) { // No block is picked yet

        // drawing grid  
        reDrawTheBoard();
  
        // hovered block
        stroke(0,0,0,0);
        fill(255,0,0);
        if (hoveredY >= 0 && hoveredX >= 0 && hoveredY < numWid && hoveredX < numHei && !sqrs[hoveredX][hoveredY].closed)
            circle(unitWidth*(hoveredX + 0.5) , unitWidth*(hoveredY + 0.5) , unitWidth);
  
    } else if (!openSet.empty() && current != end) {
        current.vsd = true;
        delete openSet[[current.i, current.j]];
        let temp = openSet.peek();
        let minNbr = addNebors(current, cameFrom, openSet, end);
        if (temp && minNbr && minNbr.f <= temp.f) {
            stroke(255);
            noFill();
            strokeWeight(unitWidth / 4);
            line(current.i * unitWidth + unitWidth / 2, current.j * unitWidth + unitWidth / 2, minNbr.i * unitWidth + unitWidth / 2, minNbr.j * unitWidth + unitWidth / 2);
            cameFrom.push(minNbr);
            current = minNbr;
        } else if (temp) {
            reDrawTheBoard();
            // disconnect(cameFrom);
            console.log(temp);
            cameFrom = openSet[[temp.i, temp.j]];
            connect(cameFrom);
            current = temp;
        }
    } else {
        if (current === end) connect(cameFrom);
        // else disconnect(cameFrom);
        else reDrawTheBoard();
        noLoop();
    }
}
