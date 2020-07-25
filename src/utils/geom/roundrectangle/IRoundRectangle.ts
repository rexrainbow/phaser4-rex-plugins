export type CornerRadiusType = {
    x: number,
    y: number
}

export type IRadiusConfig = {
    x?: number,
    y?: number,
    tl?: number | CornerRadiusType,
    tr?: number | CornerRadiusType,
    bl?: number | CornerRadiusType,
    br?: number | CornerRadiusType
}

export interface IRoundRectangle {
    x: number,
    y: number,
    width: number,
    height: number,
    cornerRadius: {
        tl: CornerRadiusType,
        tr: CornerRadiusType,
        bl: CornerRadiusType,
        br: CornerRadiusType
    }
}