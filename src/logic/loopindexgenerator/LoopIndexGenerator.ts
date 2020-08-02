import { CurrentIndexesType, AddLoopConfig } from './ILoopIndexGenerator';
import { LoopIndex } from './LoopIndex';

export class LoopIndexGenerator {
    indexes: LoopIndex[] = [];
    length: number = 0;
    firstPass = true;
    currentCount = 0;

    reset(): this {

        for (let i = 0, cnt = this.indexes.length; i < cnt; i++) {
            this.indexes[i].reset();
        }
        this.firstPass = true;
        this.currentCount = 0;

        return this;
    }

    addNumberLoop(
        key: string,
        start: number,
        end: number,
        step: number = (end >= start) ? 1 : -1
    ): this {

        this.indexes.push(new LoopIndex(key, start, end, step));
        this.length = this._getLength();
        return this;
    }

    addItemsLoop(
        key: string,
        items: any[],
        reverse: boolean = false
    ): this {

        const lastIndex = items.length - 1;
        const start = (reverse) ? lastIndex : 0;
        const end = (reverse) ? 0 : lastIndex;
        const step = (reverse) ? -1 : 1;
        this.indexes.push(new LoopIndex(key, start, end, step, items));
        this.length = this._getLength();
        return this;
    }

    addLoop({
        key, start, end, step, items
    }: AddLoopConfig
    ): this {

        this.indexes.push(new LoopIndex(key, start, end, step, items));
        this.length = this._getLength();
        return this;
    }

    removeLoops(): this {

        this.indexes.length = 0;
        this.length = 0;
        return this;
    }

    _getLength(): number {

        let total = this.indexes[0]?.length;
        for (let i = 1, cnt = this.indexes.length; i < cnt; i++) {
            total *= this.indexes[i].length;
        }
        return total ?? 0;
    }

    get progress(): number {
        return this.currentCount / this.length;
    }

    get isEnd(): boolean {

        for (let i = this.indexes.length - 1; i >= 0; i--) {
            if (!this.indexes[i].isEnd) {
                return false;
            }
        }
        return true;
    }

    next(): this {

        for (let i = this.indexes.length - 1; i >= 0; i--) {
            const loopIndex = this.indexes[i];
            const goNext = loopIndex.isEnd;
            loopIndex.next();
            if (!goNext) {
                break;
            }
        }
        return this;
    }

    getCurrent(
        out: CurrentIndexesType = {}
    ): CurrentIndexesType {

        for (let i = this.indexes.length - 1; i >= 0; i--) {
            const loopIndex = this.indexes[i];
            out[loopIndex.key] = loopIndex.current;
        }
        return out;
    }

    getNext(
        out: CurrentIndexesType = {}
    ): CurrentIndexesType {

        if (!this.firstPass) {
            this.next();
        } else {
            this.firstPass = false;
        }
        this.getCurrent(out);
        this.currentCount++;
        return out;
    }
}