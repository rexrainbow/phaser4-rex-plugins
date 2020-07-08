import { XYType, XYZType, IChess } from '../types';
import { IBaseBoard } from '../board/IBaseBoard';

export const BLOCKER = null;
export type CostValueType = number | null;
export type PreTestCallbackType = (lineTileXYArray: XYType[], visiblePoints: number, fov: IFieldOfView) => boolean;
export type GetCostCallbackType = (currTileXY: XYType, fov: IFieldOfView, lineTileXYArray: XYType[]) => CostValueType;

export enum ConeType {
    direction = 0,
    angle = 1
};

export type ConeTypeString = 'direction' | 'angle';

export interface IConfig {
    chess?: IChess;

    occupiedTest?: boolean;
    blockerTest?: boolean;
    edgeBlockerTest?: boolean;
    preTestCallback?: PreTestCallbackType,
    preTestCallbackScope?: any;

    costCallback?: GetCostCallbackType,
    costCallbackScope?: any;
    cost?: number;

    face?: number;
    coneMode?: ConeType | ConeTypeString;
    cone?: number;
};

export interface IFieldOfView {
    occupiedTest: boolean;
    blockerTest: boolean;
    edgeBlockerTest: boolean;
    preTestCallback: PreTestCallbackType,
    preTestCallbackScope: any;

    costCallback: GetCostCallbackType,
    costCallbackScope: any;
    constCost: number;

    chess: IChess;
    board: IBaseBoard;
    startTileXYZ: XYZType;
    face: number;
    faceAngle: number;
    coneMode: ConeType;
    cone: number | undefined;
    coneRad: number;
}