// control


// gridizing

var cont = document.querySelector(".cont")
var cont2 = document.querySelector(".cont2")


function change_messege(){
    let oldie = document.querySelector(".oldWel");
    let newie = document.querySelector(".newWel");
    oldie.classList.add("hideOld");
    newie.classList.add("showNew");
}

// animation and visuals
function obs(sket,obsPerc,num,sqrs,obsList) {
    for (let i = 0; i < obsPerc * (num * num) - 2; i++) {
        let x = sket.floor(sket.random(num));
        let y = sket.floor(sket.random(num));
        if (sqrs[x][y].closed) continue;
        obsList.push({x:x,y:y});
        sqrs[x][y].closed = true;
    }
}

// routing

function hScore(x, y) {
    return Math.hypot(Math.abs(y.i - x.i), Math.abs(y.j - x.j));
}

function fScore(x, y) {
    return x.g + hScore(x, y);
}

function gScore(cell, neighbour){
    if (cell.dgnl.includes(neighbour)) return cell.g + Math.hypot(1, 1);
    return cell.g + 1;

}

function add_neighbours(cell , set , path , end) {
    
    for (let neighbour of cell.neighbours) {
 
        // 1. If it's visited or closed continue looping
        if (neighbour.closed || neighbour.visited) continue;
        
        if (set[[neighbour.i, neighbour.j]]) {   // 2. If it's in the openSet    
            if (neighbour.g > gScore(cell, neighbour))    // If the new path is cheaper than the path in the OpenSet
                delete set[[neighbour.i, neighbour.j]];
            else continue;
        }
        // 3. Calculate F and G scores and store them
        neighbour.g = gScore(cell, neighbour);
        neighbour.f = fScore(neighbour, end);

        // 4. Add the neighbour cell and its path to the OpenSet 
        set[[neighbour.i, neighbour.j]] = [...path];
        set[[neighbour.i, neighbour.j]].push(neighbour);
    }
}

Set.prototype.peek = function() {
    let tmpF = Infinity;
    let ans = null;
    for (let elem in this) {
        if (this.hasOwnProperty(elem)) {
            let temp = this[elem];
            if (temp[temp.length - 1].f < tmpF) {
                tmpF = temp[temp.length - 1].f;
                ans = temp;
            }
        }
    }
    if (ans) return ans[ans.length - 1];
    return null;
}
Set.prototype.empty = function() {
    let all = Object.keys(this);
    return (all.length == 0);
}

function newCanvas ( parent , backgroundColor , pathColor , obsColor , disc , num){
    let wid = hei = 500;
    let unitWidth = wid / num;
    let obsPerc = 0.6;
    let obsList = [];
    let sqrs = [];
    let hoveredX,hoveredY;
    let pickedStart = false;
    let pickedEnd = false;
    let openSet, current, cameFrom;
    let start, end;
    let main = function (main){
        main.mouseMoved = function(){
    
            hoveredX = main.floor(main.mouseX/unitWidth);
        
            hoveredY = main.floor(main.mouseY/unitWidth);
        
        }
        main.mousePressed = function(){
            if (pickedStart && pickedEnd) return;
            if (main.mouseX <= wid && main.mouseY <= hei && main.mouseX >= 0 && main.mouseY >= 0){
        
            
            startX = main.floor(main.mouseX/unitWidth);
        
            startY = main.floor(main.mouseY/unitWidth);
        
            if (!sqrs[startX][startY].closed){
                if (!pickedStart){
                    start = sqrs[startX][startY];
                    pickedStart = true;
                    if (!disc) change_messege();
                    current = start;
                    current.g = 0;
                    openSet[[current.i,current.j]] = [current];
                    cameFrom = [current];
                    current.closed = true;
                } else if (sqrs[startX][startY] != start) {
                    end = sqrs[startX][startY];
                    current.f = fScore(current,end);
                    pickedEnd = true;
                    reDrawTheBoard();
                }
            }
        
        
        }
              
        }
        function connect(stack , dsc = disc) {
            if (dsc) return;
            main.strokeWeight(unitWidth / 4);
            main.stroke(...pathColor);
            for (let i = 0; i < stack.length - 1; i++) {
                let f = stack[i];
                let s = stack[i + 1];
                main.line(f.i * unitWidth + unitWidth / 2, f.j * unitWidth + unitWidth / 2, s.i * unitWidth + unitWidth / 2, s.j * unitWidth + unitWidth / 2);
            }
        }
        function disconnect(stack) {
            for (let i = 0; i < stack.length - 1; i++) {
                let x = stack[i];
                let y = stack[i+1];
                if (disc){
                    let s = main.map(i , 0 , stack.length-2 , main.sqrt(2)-1 , 0.0015 * num);
                    main.strokeWeight(s * unitWidth);
                    let c = main.map(i , 0 , stack.length-2 , 255 , 100);
                    main.stroke(...pathColor,c);
                } else {
                    main.strokeWeight(unitWidth / 4);
                    main.stroke(255);
                }
                main.line(x.i * unitWidth + unitWidth / 2, x.j * unitWidth + unitWidth / 2, y.i * unitWidth + unitWidth / 2, y.j * unitWidth + unitWidth / 2)
            }
            if (disc) return;
            for (let i = 0; i < stack.length - 1; i++) {
                let x = stack[i];
                let y = stack[i+1];
                main.strokeWeight(unitWidth / 10);
                main.stroke(0, 75, 0);
                main.line(x.i * unitWidth + unitWidth / 2, x.j * unitWidth + unitWidth / 2, y.i * unitWidth + unitWidth / 2, y.j * unitWidth + unitWidth / 2)
            }
        }
        function reDrawTheBoard() {
            main.background(...backgroundColor);
            main.strokeWeight(1);
            main.fill(...obsColor);
            main.stroke(...obsColor);
            if (!(disc && pickedStart && pickedEnd)){
                for (let i of obsList) {
                    main.square(unitWidth*(i.x + 0.5) , unitWidth*(i.y + 0.5) , unitWidth);
                }    
            }
            if (pickedStart) {
                main.fill(10, 150, 0);
                main.stroke(10, 150, 0)
                main.circle(unitWidth*(start.i + 0.5) , unitWidth*(start.j + 0.5) , unitWidth);
            }
            if (pickedEnd) {
                main.fill(150, 15, 0);
                main.stroke(150, 15, 0)
                main.circle(unitWidth*(end.i + 0.5) , unitWidth*(end.j + 0.5) , unitWidth);
            }
        }
        main.setup = function() {
            let cnvs = main.createCanvas(wid,hei);
            cnvs.parent(parent);
            main.background(...backgroundColor);
            main.rectMode(main.CENTER);
            for (let w = 0; w < num; w++) {
                let row = [];
                for (let z = 0; z < num; z++) {
                    let sqr = {
                        visited: false,
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
                            } else if (this.i == num - 1) {
                                this.bottom = false;
                                this.btmL = false;
                                this.btmR = false;
                            }
                            if (this.j == 0) {
                                this.left = false;
                                this.topL = false;
                                this.btmL = false;
                            } else if (this.j == num - 1) {
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
            for (let i = 0; i < num; i++) {
                for (let j = 0; j < num; j++) {
                    let neighbours = [];
                    let dgnls = [];
                    let s = sqrs[i][j];
                    if (s.top) {
                        neighbours.push(sqrs[i - 1][j]);
                    }
                    if (s.bottom) {
                        neighbours.push(sqrs[i + 1][j]);
                    }
                    if (s.right) {
                        neighbours.push(sqrs[i][j + 1]);
                    }
                    if (s.left) {
                        neighbours.push(sqrs[i][j - 1]);
                    }
                    if (s.topR) {
                        neighbours.push(sqrs[i - 1][j + 1]);
                        dgnls.push(sqrs[i - 1][j + 1]);
                    }
                    if (s.btmR) {
                        neighbours.push(sqrs[i + 1][j + 1]);
                        dgnls.push(sqrs[i + 1][j + 1]);
                    }
                    if (s.topL) {
                        neighbours.push(sqrs[i - 1][j - 1]);
                        dgnls.push(sqrs[i - 1][j - 1]);
                    }
                    if (s.btmL) {
                        neighbours.push(sqrs[i + 1][j - 1]);
                        dgnls.push(sqrs[i + 1][j - 1]);
                    }
                    s.neighbours = neighbours;
                    s.dgnl = dgnls;
                }
            }
            obs(main,obsPerc,num,sqrs,obsList);
            openSet = new Set();
        }
        main.draw = function(){
            if (!pickedStart || !pickedEnd) { // No block is picked yet
                // drawing grid  
                reDrawTheBoard();
    
                // hovered block
                main.stroke(0,0,0,0);
                main.fill(255,0,0);
                if (hoveredY >= 0 && hoveredX >= 0 && hoveredY < num && hoveredX < num && !sqrs[hoveredX][hoveredY].closed)
                    main.circle(unitWidth*(hoveredX + 0.5) , unitWidth*(hoveredY + 0.5) , unitWidth);
                    
            } else if (!openSet.empty() && current != end) {
                // 1. Mark the currnet cell as visited.
                current.visited = true;

                // 2. Delete the corresponding path in the OpenSet.
                delete openSet[[current.i, current.j]];
                // 3. ::
                add_neighbours(current,openSet,cameFrom,end);
                //  4. Get the cell with the lowest F score from the OpenSet
                let temp = openSet.peek();

                disconnect(cameFrom); // optional tracing of cancelled paths

                // 5. Draw the path from beginning to this cell 
                cameFrom = openSet[[temp.i, temp.j]];
                connect(cameFrom);
                // .. and make it the current cell
                current = temp;
            } else {
                if (current === end) connect(cameFrom , false);
                main.noLoop();
            }
        }
    }
    new p5(main);
}

newCanvas (cont , [0,0,0] , [255,255,255] , [100,25,25] , false , 30);
newCanvas (cont2 , [234,182,79] , [120,60,0] , [120,60,0] , true , 50);
