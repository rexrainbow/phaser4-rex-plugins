import { TextureManagerInstance } from '@phaserjs/phaser/textures/TextureManagerInstance';
import { IImageManager, ImageInfo } from './IImageManager';
import { MergeRight } from '../../../../utils/object/MergeRight';

export function AddImageConfig(
    imageManager: IImageManager,
    key: string,
    config: ImageInfo = { key: key }
) {

    config = MergeRight(DefaultImageInfo, config);

    let textureManager = TextureManagerInstance.get();
    let texture = textureManager.get(config.key);
    if (!texture) {
        return;
    }
    let frame = texture.getFrame(config.frame);
    if (!frame) {
        return;
    }

    let width = config.width,
        height = config.height;
    if ((width === undefined) || (height === undefined)) {
        if ((width === undefined) && (height === undefined)) {
            config.width = frame.width;
            config.height = frame.height;
        } else if (width === undefined) {
            config.width = frame.width * (height / frame.height);
        } else if (height === undefined) {
            config.height = frame.height * (width / frame.width);
        }
    }

    imageManager.images.set(key, config);
}

const DefaultImageInfo: ImageInfo = {
    key: undefined,
    frame: undefined,
    width: undefined,
    height: undefined,
    y: 0,
    left: 0,
    right: 0
}