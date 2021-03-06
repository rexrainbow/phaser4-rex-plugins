import { Frame } from '@phaserjs/phaser/textures/Frame';

export function DrawFrame(
    frame: Frame,
    canvas: HTMLCanvasElement
): HTMLCanvasElement {

    if (canvas.width !== frame.width) {
        canvas.width = frame.width;
    }
    if (canvas.height !== frame.height) {
        canvas.height = frame.height;
    }

    let context = canvas.getContext('2d');
    context.drawImage(
        frame.texture.image as HTMLCanvasElement,
        frame.x, frame.y, frame.width, frame.height
    );

    return canvas;
}