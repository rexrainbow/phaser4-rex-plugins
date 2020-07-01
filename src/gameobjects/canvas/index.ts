import { Canvas } from './Canvas';

import { CanvasBase } from './CanvasBase';
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

    CanvasBase,
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