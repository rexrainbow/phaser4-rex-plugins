export type ImageInfo = {
    key: string,
    frame?: string,
    width?: number,
    height?: number,
    y?: number,
    left?: number,
    right?: number
}

export interface IImageManager {
    images: Map<string, ImageInfo>
}