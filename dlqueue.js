const _Node = require('./node');

class DLQueue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = new _Node(data, null, this.last);

    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      this.last.next = node;

    }

    this.last = node;
  }

  dequeue() {
    if (this.first === null) {
      return;
    }

    const node = this.first;
    this.first = this.first.next;

    if (node === this.last) {
      this.last = null;
    }
    return node.value;
  }
}

module.exports = DLQueue;