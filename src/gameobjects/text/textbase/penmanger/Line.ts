import { Pen } from './Pen';

export class Line {
    pens: Pen[];
    y: number;
    height: number;

    destroy() {
        this.pens.length = 0;
    }

    addPen(
        pen: Pen
    ): this {

        this.pens.push(pen);
        return this;
    }

    get firstPen(): Pen {

        return this.pens[0];
    }

    get lastPen(): Pen {

        return this.pens[this.pens.length - 1];
    }

    hasPen(): boolean {

        return this.pens.length > 0;
    }

    get pensCount(): number {

        return this.pens.length;
    }

    get startIndex(): number {

        let firstPen = this.pens[0];
        return (firstPen) ? firstPen.startIndex : 0;
    }

    get width() {

        let lastPen = this.lastPen;
        return (lastPen) ? lastPen.lastX : 0;
    }
}