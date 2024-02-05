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

  var unitWidth = wid/num;

  var startX,startY;

  var blocksMatrix = [];

  var current,next;

  var stack;

  var done = false;

  var hoveredX,hoveredY,picked = false;

}


var cont = document.querySelector(".cont")
function setup(){

  var cnvs = createCanvas(500,500);

  cnvs.parent(cont)

  rectMode(CENTER);

  background(0);

  strokeWeight(1);

  for (let i = 0; i < num; i++) {

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

        visited: false,


      }

      sqr.check();

      row.push(sqr);
    }

    blocksMatrix.push(row);
  }
}



//functions

{

function rnd(min, max) {

  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive

}

function check_Unvisited_Neighbours(x){

  if (x.around.bottom && blocksMatrix[x.pos.i][x.pos.j+1].visited) {

    x.around.bottom = false;

  }

  if (x.around.top && blocksMatrix[x.pos.i][x.pos.j-1].visited) {

    x.around.top = false;

  }

  if (x.around.right && blocksMatrix[x.pos.i+1][x.pos.j].visited) {

    x.around.right = false;

  }

  if (x.around.left && blocksMatrix[x.pos.i-1][x.pos.j].visited) {

    x.around.left = false;

  }

}

function get_Unvisited_Neighbours(x) {

  check_Unvisited_Neighbours(x);

  let unvsd = [];

  if (x.around.top){

    unvsd.push(blocksMatrix[x.pos.i][x.pos.j-1]);

  }

  if (x.around.right){

    unvsd.push(blocksMatrix[x.pos.i+1][x.pos.j]);

  }

  if (x.around.left){

    unvsd.push(blocksMatrix[x.pos.i-1][x.pos.j]);

  }

  if (x.around.bottom){

    unvsd.push(blocksMatrix[x.pos.i][x.pos.j+1]);

  }
  return unvsd;
}

function remove_wall_between(x,y) {

  noFill();

  stroke(0);

  if (x.pos.i - y.pos.i == -1){

    for (var i = 0; i < 10; i++) {

      line(unitWidth*x.pos.i+unitWidth,unitWidth*x.pos.j+2,unitWidth*x.pos.i+unitWidth,unitWidth*x.pos.j+unitWidth-2);

    }

  }

  else if (x.pos.i - y.pos.i == 1){

    for (var i = 0; i < 10; i++) {

      line(unitWidth*y.pos.i+unitWidth,unitWidth*y.pos.j+2,unitWidth*y.pos.i+unitWidth,unitWidth*y.pos.j+unitWidth-2);

    }

  }

  else if (x.pos.j - y.pos.j == 1){

    for (var i = 0; i < 10; i++) {

      line(unitWidth*x.pos.i+2,unitWidth*x.pos.j,unitWidth*x.pos.i+unitWidth-2,unitWidth*x.pos.j);

    }

  }

  else {

        for (var i = 0; i < 10; i++) {

      line(unitWidth*y.pos.i+2,unitWidth*y.pos.j,unitWidth*y.pos.i+unitWidth-2,unitWidth*y.pos.j);

    }

  }

}

function change_background(x,color){
  stroke(0,0,0,0);
  fill(color);
  rect(unitWidth*(x.pos.i+1/2),unitWidth*(x.pos.j+1/2),unitWidth-2,unitWidth-2);
  rect(unitWidth*(x.pos.i+1/2),unitWidth*(x.pos.j+1/2),unitWidth-2,unitWidth-2);
}

}





function mouseMoved(){

  hoveredX = floor(mouseX/unitWidth);

  hoveredY = floor(mouseY/unitWidth);

}

function mousePressed(){

  if (mouseX <= wid && mouseY <= hei && mouseX >= 0 && mouseY >= 0 && !picked){

    startX = floor(mouseX/unitWidth);

    startY = floor(mouseY/unitWidth);

    current = blocksMatrix[startX][startY];

    stack = [current];   

    picked = true;

  }

}





function draw(){

    frameRate(15);
    if (!picked) { // No block is picked yet

      // drawing grid  
      background(0);
      for (let i = 0; i < num; i++) {
        fill(150,75,0);
        stroke(255);
        for (let j = 0; j < num; j++) {
          rect(unitWidth*(i+1/2),unitWidth*(j+1/2),unitWidth,unitWidth);
        }
      }

      // hovered block
      stroke(0,0,0,0);
      fill(255,0,0);
      rect(unitWidth*(hoveredX+1/2),unitWidth*(hoveredY+1/2),unitWidth-2,unitWidth-2);   

    } else { // A block is picked

      stroke(255);

      if (stack.length != 0) { // while stack is not empty

            current.visited = true;

            // 2. If the current cell has any neighbours which have not been visited
            let unvisited = get_Unvisited_Neighbours(current);
            if (unvisited.length != 0) {
                
                // 1. Pick a random unvisited neighbour to go to
                next = unvisited[rnd(0,unvisited.length-1)];
                
                //2. Remove the wall between the current cell and the chosen cell 
                remove_wall_between(next,current);

                // 3. Push the current cell to the stack
                stack.push(current);               
            }
            // 3. Else Pop a cell from the stack make the chosen neighbour
            else { // no unvisited neighbours
                    
                next = stack.pop();
            }

            // coloring next and current
            change_background(next,"red");
            change_background(current,"black");

            // 4. Make the chosen neighbour the current cell
            current = next;

        } else { // stack has become empty
            noLoop();
        }

    }

}