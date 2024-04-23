//variables

{

  var num = 20;

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

        wall : {top: true,
      
                right: true,
      
                left: true,
      
                bottom: true},
        check(){

          if (this.pos.i == 0) this.around.left = false;

          else if (this.pos.i == num-1) this.around.right = false;

          if (this.pos.j == 0) this.around.top = false;

          else if (this.pos.j == num-1) this.around.bottom = false;

        },

        show(){
          noStroke();
          if (this.visited){
            fill(0);
          } else {
            fill(150,75,0);
          }
          rect(this.pos.i*unitWidth+unitWidth/2,this.pos.j*unitWidth+unitWidth/2,unitWidth,unitWidth);
          stroke("white");
          if (this.wall.top) line(this.pos.i* unitWidth ,this.pos.j* unitWidth ,this.pos.i* unitWidth + unitWidth ,this.pos.j* unitWidth );
          if (this.wall.bottom) line(this.pos.i* unitWidth ,this.pos.j* unitWidth + unitWidth ,this.pos.i* unitWidth + unitWidth ,this.pos.j* unitWidth + unitWidth );
          if (this.wall.right) line(this.pos.i* unitWidth + unitWidth ,this.pos.j* unitWidth ,this.pos.i* unitWidth + unitWidth ,this.pos.j* unitWidth + unitWidth );         
          if (this.wall.left) line(this.pos.i* unitWidth ,this.pos.j* unitWidth ,this.pos.i* unitWidth ,this.pos.j* unitWidth + unitWidth );

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

  if (x.pos.i - y.pos.i == -1){

    x.wall.right = false;
    y.wall.left = false;

  }

  else if (x.pos.i - y.pos.i == 1){

    y.wall.right = false;
    x.wall.left = false;

  }

  else if (x.pos.j - y.pos.j == 1){

    x.wall.top = false;
    y.wall.bottom = false;

  }

  else {

    y.wall.top = false;
    x.wall.bottom = false;

  }

}

function change_background(x,color){
  fill(color);
  noStroke();
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
    frameRate(10);
    // drawing grid  
    background(0);
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        blocksMatrix[i][j].show();
      }
    }    
    if (!picked) { // No block is picked yet
      frameRate(60);
      // hovered block
      stroke(0,0,0,0);
      fill(255,0,0);
      rect(unitWidth*(hoveredX+1/2),unitWidth*(hoveredY+1/2),unitWidth-2,unitWidth-2);   

    } else { // A block is picked

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
            change_background(current,"red");

            // 4. Make the chosen neighbour the current cell
            current = next;

        } else { // stack has become empty
            noLoop();
        }

    }

}