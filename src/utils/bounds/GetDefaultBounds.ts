import { Rectangle } from '@phaserjs/phaser/geom/rectangle';
import { GetWidth, GetHeight } from '@phaserjs/phaser/config/Size'

export function GetDefaultBounds(
    out: Rectangle
): Rectangle {

    if (out === undefined) {
        if (GlobRectangle === undefined) {
            GlobRectangle = new Rectangle();
        }
        out = GlobRectangle;
    }
    out.set(0, 0, GetWidth(), GetHeight()); // TODO: ENVELOP scale?
    return out;
}

let GlobRectangle: Rectangle;