import { ICanvas } from './ICanvas';

export let Resize = function (
    canvas: ICanvas,
    width: number,
    height: number) {

    let newCanvasWidth = Math.ceil(width * canvas.resolution);
    let newCanvasHeight = Math.ceil(height * canvas.resolution);
    let srcCanvas = canvas.canvas;
    if ((srcCanvas.width === newCanvasWidth) || (srcCanvas.height === newCanvasHeight)) {
        Clear(canvas);
        return;
    }

    srcCanvas.width = newCanvasWidth;
    srcCanvas.height = newCanvasHeight;
    canvas.texture.setSize(width, height);
    canvas.setSize(width, height);
    canvas.updateTexture();
}

export let Clear = function (
    canvas: ICanvas
): void {

    canvas.context.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.updateTexture();
};

export let Fill = function (
    canvas: ICanvas,
    fillStyle: string | CanvasGradient | CanvasPattern = '#fff'
): void {

    let context = canvas.context;
    context.fillStyle = fillStyle;
    context.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.updateTexture();
};

export let LoadFromURL = function (
    canvas: ICanvas,
    url: string,
    callback?: () => void
): void {

    let img = new Image();
    img.onload = function () {
        let resolution = canvas.resolution;
        let displayWidth = img.width / resolution,
            displayHeight = img.height / resolution;
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

export let LoadFromURLPromise = function (
    canvas: ICanvas,
    url: string
): Promise<number> {

    return new Promise(function (resolve, reject) {
        LoadFromURL(canvas, url, resolve);
    });
};

export let GetDataURL = function (
    canvas: ICanvas,
    type?: string,
    encoderOptions?: any
): string {

    return canvas.canvas.toDataURL(type, encoderOptions);
};

export let GetPixel = function (
    canvas: ICanvas,
    x: number,
    y: number,
    out: [number, number, number, number] = [0, 0, 0, 0]
): [number, number, number, number] {

    let data = canvas.context.getImageData(x, y, 1, 1).data;
    out[0] = data[0];
    out[1] = data[1];
    out[2] = data[2];
    out[3] = data[3];
    return out;
}

export let SetPixel = function (
    canvas: ICanvas,
    x: number, y: number,
    r: number, g: number, b: number, a?: number
): void {

    if (a === undefined) {
        a = ((r !== 0) || (g !== 0) || (b !== 0)) ? 255 : 0;
    }

    let imgData = canvas.context.createImageData(1, 1);
    imgData.data[0] = r;
    imgData.data[1] = g;
    imgData.data[2] = b;
    imgData.data[3] = a;
    canvas.context.putImageData(imgData, x, y);
    canvas.updateTexture();
}