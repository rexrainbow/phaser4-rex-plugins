import { IRadiusConfig } from '../../../utils/geom/roundrectangle/IRoundRectangle';
import { GetCanvasGradientCallbackType } from '../../../utils/types/GetCanvasGradientCallbackType';

export interface IConfig {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    radius?: IRadiusConfig | number;
    iteration?: number;
    fillStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType;
    fillColor2?: string | number;
    isHorizontalGradient?: boolean;
    strokeStyle?: string | number | CanvasGradient | CanvasPattern | GetCanvasGradientCallbackType;
    lineWidth?: number;
}