import { Rectangle, Contains } from '@phaserjs/phaser/geom/rectangle';

export class HitAreaManager {
    hitAreas: Map<string, Rectangle>;

    constructor() {

        this.hitAreas = new Map();
    }

    destroy(): void {

        this.clear();
    }

    clear(): this {

        this.hitAreas.clear();
        return this;
    }

    add(
        key: string,
        x: number,
        y: number,
        width: number,
        height: number
    ): this {

        if (this.hitAreas.has(key)) {
            this.hitAreas.get(key).set(x, y, width, height);
        } else {
            let area = new Rectangle(x, y, width, height);
            this.hitAreas.set(key, area)
        }

        return this;
    }

    get(key: string): Rectangle {

        return this.hitAreas.get(key);
    }

    getFirstHitArea(
        x: number,
        y: number
    ): string {

        for (const [key, rect] of this.hitAreas) {
            if (Contains(rect, x, y)) {
                return key;
            }
        }

        return null;
    }

    //TODO
    //drawBounds(graphics, color, parent) {
    //    if (color === undefined) {
    //        color = 0xffffff;
    //    }
    //
    //    if (parent) {
    //        graphics
    //            .save()
    //            .scaleCanvas(parent.scaleX, parent.scaleY)
    //            .rotateCanvas(parent.rotation)
    //            .translateCanvas(parent.x, parent.y)
    //    }
    //
    //    var hitAreas = this.hitAreas, hitArea;
    //    for (var i = 0, cnt = hitAreas.length; i < cnt; i++) {
    //        hitArea = hitAreas[i];
    //        graphics.lineStyle(1, color).strokeRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
    //    }
    //
    //    if (parent) {
    //        graphics
    //            .restore()
    //    }
    //    return this;
    //}
}