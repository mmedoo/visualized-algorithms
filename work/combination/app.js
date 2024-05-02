const qs = (x , d = document) => d.querySelector(x);
const qsA = (x , d = document) => d.querySelectorAll(x);


Char.prototype.show = function(x){
    let bg,clr;
    if (x){
        bg = 255;
        clr = 0;
    } else {
        bg = 0 ;
        clr = 255;
    }
    fill(bg);
    circle(this.posX , this.posY , 37);
    fill(clr);
    text(this.char, this.posX , this.posY);
}

function Char(l , posX , posY){
    this.char = l;
    this.posX = posX;
    this.posY = posY;
    this.marked = false;
} 


class queue {
    constructor(){
        this.head = null;
        this.tail = null;
        this.next = null;
    }
    enqNode(node){
        if (this.head == null){
            this.head = node;
            this.tail = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
    }
    enq(k , index , word){
        this.enqNode(new Node(k , index , word , null));
    }
    deq(){
        if (this.head == null) return null;
        let temp = this.head;
        if (this.head === this.tail){
            this.head = null;
            this.tail = null;
        } else this.head = this.head.next;
        return temp;
    }
    
};


class qStack {
    constructor(){
        this.head = null;
    }
    push(q){
        q.next = this.head;
        this.head = q;
    }
    pop(){
        if (this.head == null) return null;
        let temp = this.head;
        this.head = this.head.next;
        return temp;
    }
}


class Node{
    constructor(k , index , word , next){
        this.next = next;
        this.k = k;
        this.index = index;
        this.word = word;
    }
};




function reset(){
    background(0);
    for (let l in letterMap){
        letterMap[l].show();
    }
}



// const wid = innerWidth / 2;
// const hei = innerHeight - 4;
const wid = innerWidth;
const hei = 100;
// const wid = hei;
// const hei = wid;


const letters_input = qs("#n");
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var arr = letters.slice(0, Number(letters_input.value));
var letterMap = {};

createCharMap();

function createCharMap(){
    let sideLength = Math.ceil(Math.sqrt(arr.length));
    let horzLength = arr.length / sideLength;
    letterMap = {};
    for (let i = 0; i < arr.length; i++){
        // let x = (wid / (sideLength + 1)) * (i % sideLength + 1);
        // let y = (hei / (horzLength + 1)) * (Math.floor(i / horzLength) + 1);
        let x = (wid / (arr.length+1)) * (i + 1);
        let y = hei / 2;
        // let y = 50;
        letterMap[arr[i]] = new Char(arr[i], x, y);
    }
}



function combine(arr , node , st){
    let index = node.index;
    let k = node.k;
    let word = node.word;
    if (k == 0){
        reset();
        for(let l of word) letterMap[l].show(true);
        word_cont.innerHTML += `<div><span>${word}</span><span>${++n}</span></div>`;
        word_cont.scrollTop = word_cont.scrollHeight;
        return;
    }
    let q = new queue();
    for (let i = index; i < arr.length - k + 1; i++)
        q.enq(k-1 , i+1 , word + arr[i]);
    st.push(q);
}

const preview = qs(".draw");
const word_cont = qs(".words");
const fps = qs("#fps");
const k_input = qs("#k");

function setup(){
    let c = createCanvas(wid, hei);
    c.parent(preview);
    background(0);
    rectMode(CENTER);
    textAlign(CENTER , CENTER);
    textSize(22);
    reset();
    letters_input.addEventListener("change" , function(){
        reset();
    });    
}


var stop = true;
function keyPressed(){
    if (key == " "){
        reset();
        resetComb();
        stop = false;
    }
}
function mousePressed(){
    if (mouseX >= 0 && mouseX <= wid && mouseY >= 0 && mouseY <= hei) {
        reset();
        resetComb();
        stop = false;
    }
}

function resetComb(k = Number(k_input.value)){
    n = 0;
    st = new qStack();
    q = new queue();
    node = new Node(k , 0 , "" , null);
    q.enqNode(node);
    word_cont.innerHTML = "";
}


var n,
    k,
    st,
    q,
    node;
resetComb();

var fR = 20;
const fR_display = qs("#fps + span");
fps.addEventListener("input" , function(){
    fR = Number(this.value);
    frameRate(fR);
    fR_display.innerText = fR + " fps";
});
k_input.addEventListener("change" , function(){
    resetComb();
    // stop = false;
})
letters_input.addEventListener("change" , function(){
    k_input.setAttribute("max",Number(this.value));
    if (Number(this.value) < Number(k_input.value))
        k_input.value = Number(this.value);
    if (Number(this.value) > 26)
        this.value = 26;
    resetComb();
    arr = letters.slice(0, Number(this.value));
    createCharMap();
});
function draw(){
    if (stop) return;
    node = q.deq();
    st.push(q);
    combine(arr , node , st);
    q = st.pop();
    while (q.head == null && st.head != null) q = st.pop();
    if (st.head == null && q.head == null){
        stop = true;
        return;
    }
    frameRate(fR);
    let pos = qsA(".words div");
    if (pos.length ==  100) pos[0].remove();
}