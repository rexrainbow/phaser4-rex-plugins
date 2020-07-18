import { Rectangle } from '@phaserjs/phaser/geom/rectangle';

export class HitArea extends Rectangle {
    name: string;

    constructor(x: number, y: number, width: number, height: number, name: string) {

        super(x, y, width, height);
        this.name = name;
    }
}

export class HitAreaManager {
    hitAreas: HitArea[] = [];

    destroy(): void {

        this.clear();
    }

    clear(): this {

        this.hitAreas.length = 0;
        return this;
    }

    add(
        key: string,
        x: number,
        y: number,
        width: number,
        height: number
    ): this {

        let area = new HitArea(x, y, width, height, key);
        this.hitAreas.push(area);
        return this;
    }

    getFirstHitArea(
        x: number,
        y: number
    ): HitArea {

        for (let i = 0, cnt = this.hitAreas.length; i < cnt; i++) {
            let area = this.hitAreas[i];
            if (area.contains(x, y)) {
                return area;
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
