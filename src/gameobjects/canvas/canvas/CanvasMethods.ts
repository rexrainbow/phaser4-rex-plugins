import { ICanvas } from './ICanvas';

export function Resize(
    canvas: ICanvas,
    width: number,
    height: number) {

    const newCanvasWidth = Math.ceil(width * canvas.resolution);
    const newCanvasHeight = Math.ceil(height * canvas.resolution);
    const srcCanvas = canvas.canvas;
    if ((srcCanvas.width === newCanvasWidth) && (srcCanvas.height === newCanvasHeight)) {
        Clear(canvas);
        return;
    }

    srcCanvas.width = newCanvasWidth;
    srcCanvas.height = newCanvasHeight;
    canvas.texture.setSize(width, height);
    canvas.setSize(width, height);
    canvas.updateTexture();
}

export function Clear(
    canvas: ICanvas
): void {

    canvas.context.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.updateTexture();
};

export function Fill(
    canvas: ICanvas,
    fillStyle: string | CanvasGradient | CanvasPattern = '#fff'
): void {

    let context = canvas.context;
    context.fillStyle = fillStyle;
    context.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.updateTexture();
};

export function LoadFromURL(
    canvas: ICanvas,
    url: string,
    callback?: () => void
): void {

    const img = new Image();
    img.onload = function () {
        const resolution = canvas.resolution;
        const displayWidth = img.width / resolution;
        const displayHeight = img.height / resolution;
        Resize(canvas, displayWidth, displayHeight);
        canvas.context.drawImage(img, 0, 0);
        canvas.updateTexture();

        if (callback) {
            callback();
        }

        img.onload = null;
        img.src = '';
        img.remove();
    }
    img.src = url;
};

export function LoadFromURLPromise(
    canvas: ICanvas,
    url: string
): Promise<number> {

    return new Promise(function (resolve, reject) {
        LoadFromURL(canvas, url, resolve);
    });
};

export function GetDataURL(
    canvas: ICanvas,
    type?: string,
    encoderOptions?: unknown
): string {

    return canvas.canvas.toDataURL(type, encoderOptions);
};

export function GetPixel(
    canvas: ICanvas,
    x: number,
    y: number,
    out: [number, number, number, number] = [0, 0, 0, 0]
): [number, number, number, number] {

    const data = canvas.context.getImageData(x, y, 1, 1).data;
    out[0] = data[0];
    out[1] = data[1];
    out[2] = data[2];
    out[3] = data[3];
    return out;
}

export function SetPixel(
    canvas: ICanvas,
    x: number, y: number,
    r: number, g: number, b: number, a?: number
): void {

    if (a === undefined) {
        a = ((r !== 0) || (g !== 0) || (b !== 0)) ? 255 : 0;
    }

    const imgData = canvas.context.createImageData(1, 1);
    imgData.data[0] = r;
    imgData.data[1] = g;
    imgData.data[2] = b;
    imgData.data[3] = a;
    canvas.context.putImageData(imgData, x, y);
    canvas.updateTexture();
}