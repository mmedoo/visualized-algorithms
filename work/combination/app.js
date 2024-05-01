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

var arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
var letterMap = {};

let sideLength = Math.ceil(Math.sqrt(arr.length));
let horzLength = arr.length / sideLength;
for (let i = 0; i < arr.length; i++){
    // let x = (wid / (sideLength + 1)) * (i % sideLength + 1);
    // let y = (hei / (horzLength + 1)) * (Math.floor(i / horzLength) + 1);
    let x = (wid / (arr.length+1)) * (i + 1);
    let y = hei / 2;
    // let y = 50;
    letterMap[arr[i]] = new Char(arr[i], x, y);
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
function setup(){
    let c = createCanvas(wid, hei);
    c.parent(preview);
    background(0);
    rectMode(CENTER);
    textAlign(CENTER , CENTER);
    textSize(22);
    reset();
}


var stop = true;
function keyPressed(){
    if (key == " "){
        stop = false;
    }
}
function mousePressed(){
    if (mouseX >= 0 && mouseX <= wid && mouseY >= 0 && mouseY <= hei) {
        stop = false;
    }
}

var n = 0;
var k = 5;
var st = new qStack();
var q = new queue();
var node = new Node(k , 0 , "" , null);
q.enqNode(node);
function draw(){
    if (stop) return;
    node = q.deq();
    st.push(q);
    combine(arr , node , st);
    q = st.pop();
    while (q.head == null && st.head != null) q = st.pop();
    if (st.head == null && q.head == null){
        // noLoop();
        stop = true;
        return;
    }
    frameRate(20);
    let pos = qsA(".words div");
    if (pos.length ==  30) pos[0].remove(); 
}