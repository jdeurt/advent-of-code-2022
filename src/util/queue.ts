export class Queue<T> {
    private queue: T[] = [];
    private head = 0;

    constructor(initial: T[] = []) {
        this.queue = initial;
    }

    get length() {
        return this.queue.length - this.head;
    }

    enqueue(item: T) {
        this.queue.push(item);
    }

    dequeue(): T | undefined {
        if (this.queue.length == 0) return undefined;

        const item = this.queue[this.head];
        this.head++;

        if (this.head * 2 >= this.queue.length) {
            this.queue = this.queue.slice(this.head);
            this.head = 0;
        }

        return item;
    }

    peek(): T | undefined {
        return this.queue[this.head];
    }

    isEmpty() {
        return this.queue.length == 0;
    }

    *[Symbol.iterator]() {
        while (this.queue.length > 0) {
            yield this.dequeue()!;
        }
    }
}
