class queue {
	constructor() {
		this.head = null;
		this.tail = null;
		this.next = null;
	}
	enqNode(node) {
		if (this.head == null) {
			this.head = node;
			this.tail = node;
			return;
		}
		this.tail.next = node;
		this.tail = node;
	}
	enq(k, index, word) {
		this.enqNode(new Node(k, index, word, null));
	}
	deq() {
		if (this.head == null) return null;
		let temp = this.head;
		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;
		} else this.head = this.head.next;
		return temp;
	}

};

class qStack {
	constructor() {
		this.head = null;
	}
	push(q) {
		q.next = this.head;
		this.head = q;
	}
	pop() {
		if (this.head == null) return null;
		let temp = this.head;
		this.head = this.head.next;
		return temp;
	}
}

class Node {
	constructor(k, index, word, next) {
		this.next = next;
		this.k = k;
		this.index = index;
		this.word = word;
	}
};


// function Char(l, posX, posY) {
// 	this.char = l;
// 	this.posX = posX;
// 	this.posY = posY;
// 	this.marked = false;
// }

class Char {
	constructor(l, posX, posY) {
		this.char = l;
		this.posX = posX;
		this.posY = posY;
		this.marked = false;
	}
	show = function (p, x) {
		if (!p) return;
		let bg, clr;
		// x = true;
		if (x) {
			bg = [255];
			clr = [0];
		} else {
			bg = [0, 0, 0, 0];
			clr = [255];
		}
		p.noStroke();
		p.fill(...bg);
		p.circle(this.posX, this.posY - 1, 35);
		p.fill(...clr);
		p.text(this.char, this.posX, this.posY);
	}
}

export { queue, qStack, Node, Char };