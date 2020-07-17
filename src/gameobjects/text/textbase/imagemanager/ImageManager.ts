import { TextureManagerInstance } from '@phaserjs/phaser/textures/TextureManagerInstance';
import { IImageManager, ImageInfo } from './IImageManager';
import { AddImageConfig } from './AddImageConfig';
import { Frame } from '@phaserjs/phaser/textures/Frame';

export class ImageManager implements IImageManager {
    images: Map<string, ImageInfo>

    constructor() {
        this.images = new Map();
    }

    add(
        key: string | string[] | { [key: string]: ImageInfo },
        config?: ImageInfo
    ): this {

        if (typeof (key) === 'string') {
            AddImageConfig(this, key, config);
        } else if (Array.isArray(key)) {
            let data = key;
            for (let i = 0, cnt = data.length; i < cnt; i++) {
                AddImageConfig(this, data[i]);
            }
        } else {
            let data = key;
            for (key in data) {
                AddImageConfig(this, key, data[key]);
            }
        }
        return this;
    }

    remove(
        key: string
    ): this {

        this.images.delete(key);
        return this;
    }

    get(
        key: string
    ): ImageInfo {

        return this.images.get(key);
    }

    getOuterWidth(
        key: string
    ): number {

        let imageInfo = this.images.get(key);
        return (imageInfo) ? (imageInfo.width + imageInfo.left + imageInfo.right) : 0;
    }

    getFrame(
        key: string
    ): Frame {

        let imageInfo = this.images.get(key);
        if (!imageInfo) {
            return;
        }

        let textureManager = TextureManagerInstance.get();
        let texture = textureManager.get(imageInfo.key);
        if (!texture) {
            return;
        }

        let frame = texture.getFrame(imageInfo.frame);
        return frame;
    }

    hasTexture(
        key: string
    ): boolean {

        return !!this.getFrame(key);
    }
}