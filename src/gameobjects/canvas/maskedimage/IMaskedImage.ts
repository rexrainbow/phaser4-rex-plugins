import { IRadiusConfig } from '../../../utils/geom/roundrectangle/IRoundRectangle';

export enum MaskType {
    circle = 0,
    ellipse = 1,
    roundRectangle = 2
}

export type MaskTypeString = 'circle' | 'ellipse' | 'roundRectangle'

export interface IConfig {
    maskType?: MaskType | MaskTypeString,
    backgroundStyle?: string | CanvasGradient | CanvasPattern,
    radius?: IRadiusConfig | number
}