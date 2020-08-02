export class LoopIndex {
    key: string;
    start: number;
    end: number;
    step: number;
    items: any[];
    _current: number;

    constructor(
        key: string,
        start: number,
        end: number,
        step: number,
        items?: any[]
    ) {

        this.key = key;
        this.start = start;
        this.end = end;
        this.step = step;
        this.items = items;
        this._current = start;
    }

    reset(): void {

        this._current = this.start;
    }

    get isEnd(): boolean {

        return (this.step >= 0) ? (this._current >= this.end) : (this._current <= this.end);
    }

    get length(): number {

        if (((this.step >= 0) && (this.start > this.end)) ||
            ((this.step < 0) && (this.start < this.end))) {
            return 0;
        }
        return Math.floor(this.end - this.start) + 1;
    }

    next(): this {

        if (this.isEnd) {
            this._current = this.start;
        } else {
            this._current += this.step;
        }
        return this;
    }

    get current(): number | any {

        return (!this.items) ? this._current : this.items[this._current];
    }
}