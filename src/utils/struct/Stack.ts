export class Stack {
    items: any[];

    constructor() {
        this.items = [];
    }

    destroy(): void {
        this.clear();
        this.items = undefined;
    }

    pop(): any {
        return (this.items.length > 0) ? this.items.pop() : null;
    }

    push(l: any): this {
        this.items.push(l);
        return this;
    }

    pushMultiple(arr: any[]): this {
        this.items.push.apply(this.items, arr);
        arr.length = 0;
        return this;
    }

    clear(): this {
        this.items.length = 0;
        return this;
    }
}