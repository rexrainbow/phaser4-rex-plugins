// Copy from Phaser.Utils.String.Pad, phaser3

export enum PadDirMode {
    left = 1,
    right = 2,
    both = 3
}

export function Pad(
    str: string | number | object,
    len: number = 0,
    pad: string = ' ',
    dir: PadDirMode = PadDirMode.left
): string {

    str = str.toString();

    let padlen = 0;

    if (len + 1 >= str.length) {
        switch (dir) {
            case 1:
                str = new Array(len + 1 - str.length).join(pad) + str;
                break;

            case 3:
                padlen = len - str.length;
                let right = Math.ceil(padlen / 2);
                let left = padlen - right;
                str = new Array(left + 1).join(pad) + str + new Array(right + 1).join(pad);
                break;

            default:
                str = str + new Array(len + 1 - str.length).join(pad);
                break;
        }
    }

    return str;
};