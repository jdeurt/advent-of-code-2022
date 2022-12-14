export class Queue {
    queue = [];
    head = 0;
    constructor(initial = []) {
        this.queue = initial;
    }
    get length() {
        return this.queue.length - this.head;
    }
    enqueue(item) {
        this.queue.push(item);
    }
    dequeue() {
        if (this.queue.length == 0)
            return undefined;
        const item = this.queue[this.head];
        this.head++;
        if (this.head * 2 >= this.queue.length) {
            this.queue = this.queue.slice(this.head);
            this.head = 0;
        }
        return item;
    }
    peek() {
        return this.queue[this.head];
    }
    isEmpty() {
        return this.queue.length == 0;
    }
    *[Symbol.iterator]() {
        while (this.queue.length > 0) {
            yield this.dequeue();
        }
    }
}
