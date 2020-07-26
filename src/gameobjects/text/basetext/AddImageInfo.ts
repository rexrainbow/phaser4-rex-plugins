import { IBaseText } from './IBaseText';
import { ImageInfo } from './imagemanager/IImageManager'

export function AddImageInfo(
    baseText: IBaseText,
    key: string | string[] | { [key: string]: ImageInfo },
    config?: ImageInfo
) {

    baseText.canvasText.addImageInfo(key, config);
}