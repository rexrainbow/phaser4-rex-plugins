import { ICanvas } from '../canvas/ICanvas';
import { IConfig, MaskType, MaskTypeString } from './IMaskedImage';
import { IRadiusConfig } from '../../../utils/geom/roundrectangle/IRoundRectangle';
import { TextureManagerInstance } from '@phaserjs/phaser/textures/TextureManagerInstance';
import { AddRoundRectanglePath } from '../../../utils/canvas/AddRoundRectanglePath';

export function MaskImage(
    baseCanvas: ICanvas,
    key: string,
    frame?: string | number,
    config: MaskType | MaskTypeString | IConfig = MaskType.circle
) {

    let maskType: MaskType | MaskTypeString;
    let backgroundStyle: string | CanvasGradient | CanvasPattern;
    let radius: IRadiusConfig | number;
    let iteration: number;

    if (typeof (config) === 'object') {
        ({ maskType, backgroundStyle, radius, iteration } = config);
    } else {
        maskType = config;
    }

    if (typeof (maskType) === 'string') {
        maskType = MaskType[maskType];
    }

    const canvas = baseCanvas.canvas;
    const ctx = baseCanvas.context;

    // Get frame object, and size
    const textureManager = TextureManagerInstance.get();
    if (!textureManager.has(key)) {
        return;
    }
    const frameObj = textureManager.get(key).getFrame(frame);
    const width = frameObj.width;
    const height = frameObj.height;

    // Resize canvas
    if (canvas.width !== width) {
        canvas.width = width;
    }
    if (canvas.height !== height) {
        canvas.height = height;
    }

    // Clear context
    ctx.clearRect(0, 0, width, height);

    // Draw background
    if (backgroundStyle) {
        ctx.fillStyle = backgroundStyle;
        ctx.fillRect(0, 0, width, height);
    }

    // Add clip path
    ctx.beginPath();

    switch (maskType) {

        case MaskType.roundRectangle:
            AddRoundRectanglePath(ctx, 0, 0, width, height, radius, iteration);
            break;

        default: // circle, ellipse
            const centerX = Math.floor(width / 2);
            const centerY = Math.floor(height / 2);
            if (maskType === MaskType.circle) {
                ctx.arc(centerX, centerY, Math.min(centerX, centerY), 0, (2 * Math.PI));
            } else {
                ctx.ellipse(centerX, centerY, centerX, centerY, 0, 0, (2 * Math.PI));
            }
            break;
    }

    ctx.clip();

    // Draw frame image
    ctx.drawImage(
        frameObj.texture.image as HTMLCanvasElement,
        frameObj.x, frameObj.y, frameObj.width, frameObj.height
    );

    baseCanvas.texture.setSize(width, height);
    baseCanvas.setSize(width, height);
    baseCanvas.updateTexture();
}