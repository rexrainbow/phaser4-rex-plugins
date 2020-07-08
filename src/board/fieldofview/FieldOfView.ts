import {
    IFieldOfView,
    IConfig,
    PreTestCallbackType, GetCostCallbackType,
    ConeType, ConeTypeString,
    BLOCKER
} from './IFieldOfView';
import { IChess, XYZType, XYType } from '../types';
import { IBaseBoard } from '../board/IBaseBoard';
import { WorldXY } from '../board'
import { DegToRad } from '../../utils/math/angle/DegToRad';
import { Normalize as AngleNormalize } from '../../utils/math/angle/Normalize';
import { IsInLOS } from './IsInLOS';
import { LOS } from './LOS';
import { FindFOV } from './FindFOV';


export class FieldOfView implements IFieldOfView {
    occupiedTest: boolean;
    blockerTest: boolean;
    edgeBlockerTest: boolean;
    preTestCallback: PreTestCallbackType;
    preTestCallbackScope: any;

    costCallback: GetCostCallbackType;
    costCallbackScope: any;
    constCost: number;

    chess: IChess;
    _face: number;
    faceAngle: number;
    coneMode: ConeType;
    _cone: number | undefined;
    coneRad: number;

    constructor({
        occupiedTest = false,
        blockerTest = false,
        edgeBlockerTest = false,
        preTestCallback = undefined,
        preTestCallbackScope = undefined,

        costCallback = undefined,
        costCallbackScope = undefined,
        cost = 1,

        chess = undefined,
        face = 0,
        coneMode = ConeType.direction,
        cone = undefined
    }: IConfig = {}) {

        this.setOccupiedTest(occupiedTest);
        this.setBlockerTest(blockerTest);
        this.setEdgeBlockerTest(edgeBlockerTest);

        this.setPreTestFunction(preTestCallback, preTestCallbackScope);
        if (costCallback) {
            this.setCostFunction(costCallback, costCallbackScope);
        } else {
            this.setConstCost(cost);
        }

        this.setChess(chess);
        this.setFace(face);
        this.setConeMode(coneMode);
        this.setCone(cone);
    }

    destroy() {
    }

    setChess(
        chess?: IChess
    ): this {

        if (chess === undefined) {
            this.chess = null;
        } else {
            this.chess = chess;
        }
        return this;
    }

    get face(): number {
        return this._face;
    }

    set face(direction: number) {
        if (this.board === null) {
            return;
        }

        direction = this.board.grid.directionNormalize(direction);
        this._face = direction;
        if (this.coneMode === 0) { // Direction
            // Do nothing
        } else { // Angle
            var angle = WorldXY.AngleToward(this.board, this.startTileXYZ, direction); // -PI~PI
            this.faceAngle = AngleNormalize(angle); // 0~2PI
        }
    }

    setFace(
        direction: number
    ): this {

        this.face = direction;
        return this;
    }

    get cone(): number {
        return this._cone;
    }

    set cone(value: number) {
        this._cone = value;

        if (value !== undefined) {
            if (this.coneMode === 0) { // Direction
            } else { // Angle
                this.coneRad = DegToRad(value);
            }
        }
    }

    setConeMode(
        mode: ConeType | ConeTypeString
    ): this {

        if (typeof (mode) === 'string') {
            mode = ConeType[mode];
        }
        this.coneMode = mode;
        return this;
    }

    setCone(
        value?: number
    ): this {

        this.cone = value;
        return this;
    }

    setOccupiedTest(
        enable = true
    ): this {

        this.occupiedTest = enable;
        return this;
    }

    setBlockerTest(
        enable = true
    ): this {

        this.blockerTest = enable;
        return this;
    }

    setEdgeBlockerTest(
        enable = true
    ): this {

        this.edgeBlockerTest = enable;
        return this;
    }

    setCostFunction(
        callback?: GetCostCallbackType,
        scope?: any): this {

        this.costCallback = callback;
        this.costCallbackScope = scope;

        if (callback) {
            this.setConstCost();
        }
        return this;
    }

    setConstCost(
        cost?: number
    ): this {

        this.constCost = cost;

        if (cost !== undefined) {
            this.setCostFunction();
        }
        return this;
    }

    setPreTestFunction(
        callback?: PreTestCallbackType,
        scope?: any
    ): this {

        this.preTestCallback = callback;
        this.preTestCallbackScope = scope;
        return this;
    }

    // setDebugGraphics(graphics) {
    //     this.debugGraphics = graphics;
    //     return this;
    // }

    // setDebugLineColor(visibleLineColor, invisibleLineColor) {
    //     this.debugVisibleLineColor = visibleLineColor;
    //     this.debugInvisibleLineColor = invisibleLineColor;
    //     return this;
    // }

    // setDebugLog(enabled) {
    //     if (enabled === undefined) {
    //         enabled = true;
    //     }
    //     this.debugLog = enabled;
    //     return this;
    // }

    // clearDebugGraphics() {
    //     if (this.debugGraphics) {
    //         this.debugGraphics.clear();
    //     }
    //     return this;
    // }

    isInLos(
        chess: IChess | XYZType,
        visiblePoints?: number | undefined,
        originTileXY: XYType = this.startTileXYZ
    ): boolean {

        return IsInLOS(this, chess, visiblePoints, originTileXY);
    }

    los(
        chessArray: IChess[] | XYType[] | IChess | XYType,
        visiblePoints: number | undefined,
        originTileXY: XYType = this.startTileXYZ,
        out?: IChess[] | XYType[]
    ): IChess[] | XYType[] | boolean {

        return LOS(this, chessArray, visiblePoints, originTileXY, out);
    }

    findFOV(
        visiblePoints?: number,
        originTileXY: XYType = this.startTileXYZ,
        out: XYType[] = []
    ): XYType[] {

        return FindFOV(this, visiblePoints, originTileXY, out);
    }

    get board(): IBaseBoard {

        return (this.chess && this.chess.rexChess) ? this.chess.rexChess.board : null;
    }

    get startTileXYZ(): XYZType {

        return (this.chess && this.chess.rexChess) ? this.chess.rexChess.tileXYZ : null;
    }

    get BLOCKER() {
        return BLOCKER;
    }
}