import { Canvas } from './Canvas';

import { BaseCanvas } from './BaseCanvas';
import {
    Resize, Clear, Fill,
    LoadFromURL, LoadFromURLPromise, GetDataURL,
    GetPixel, SetPixel
} from './CanvasMethods';
import {
    GenerateTexture, LoadTexture
} from './TextureMethods';

export {
    Canvas,

    BaseCanvas,
    Clear,
    Fill,
    GenerateTexture,
    GetDataURL,
    GetPixel,
    LoadFromURL,
    LoadFromURLPromise,
    LoadTexture,
    Resize,
    SetPixel
}