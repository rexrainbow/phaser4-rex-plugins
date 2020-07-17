export class Stack<T> {
    items: T[];

    constructor() {
        this.items = [];
    }

    destroy(): void {
        this.clear();
        this.items = undefined;
    }

    pop(): T {
        return (this.items.length > 0) ? this.items.pop() : null;
    }

    push(l: T): this {
        this.items.push(l);
        return this;
    }

    pushMultiple(arr: T[]): this {
        this.items.push.apply(this.items, arr);
        arr.length = 0;
        return this;
    }

    clear(): this {
        this.items.length = 0;
        return this;
    }
}