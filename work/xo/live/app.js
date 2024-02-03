const boxes = document.querySelectorAll('.inner2');
const reset = document.querySelector('.button');
const c1 = document.querySelectorAll(".c1");
const c2 = document.querySelectorAll(".c2");
const c3 = document.querySelectorAll(".c3");
const r1 = document.querySelectorAll(".r1");
const r2 = document.querySelectorAll(".r2");
const r3 = document.querySelectorAll(".r3");
const xltr = document.querySelectorAll(".xltr");
const xrtl = document.querySelectorAll(".xrtl");
const rows = [c1,c2,c3,r1,r2,r3,xrtl,xltr];
let turn = 1;
let stop = 0;
function prevent() {
    for (let index of boxes) {
        index.classList.remove('hoverX','hoverO');
        index.classList.add('end');
    }
    stop = 1;
}
function checkEnd(array){
    let innerT = "";
    for (let i = 0; i < 3; i++)  innerT += array[i].innerText;
    if (innerT === "XXX") {
        prevent();
        for (let piece of array){ piece.classList.add('winnerX') }
        return 1;
    } else if (innerT === "OOO") {
        prevent();
        for (let piece of array){ piece.classList.add('winnerO') }
        return 1;
  }
}
for (let box of boxes){
    reset.addEventListener('click',function(){
          setTimeout(()=>{
            box.innerText = '';
            stop = 0;
          },400)
          box.style.fontSize = '0px';
          box.id = '';
          turn = 1;
          box.classList.remove('winnerX','winnerO','playX','playO','end','hoverO');
          box.classList.add('hoverX');
          stop = 1;
    });
    box.addEventListener('click',function(){
          if (stop) return 0;
          if (box.id == '') {
                box.innerText = '';
                if (turn) {
                    box.innerText = 'X';
                    box.style.fontSize = '8.7847731vw';
                    box.classList.add('playX');
                    for (let boix of boxes) {
                        if (boix.id != 'pressed')  boix.classList.add('hoverO');
                    }
                } else {
                    box.innerText = 'O';
                    box.style.fontSize = '8.7847731vw';
                    box.classList.add('playO');
                    for (let boix of boxes) { boix.classList.remove('hoverO') }
                }
                box.classList.remove('hoverX','hoverO');
          } else { turn = !turn }
          turn = !turn;
          box.id = 'pressed';
          for (let row of rows)  if (checkEnd(row))  return 0;
          let pressure = document.querySelectorAll("#pressed");
          if (pressure.length == 9)  prevent();
    })
}
