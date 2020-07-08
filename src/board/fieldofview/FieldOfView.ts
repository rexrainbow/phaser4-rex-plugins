
import AngleNormalize from '../../utils/math/angle/Normalize.js';

import {
    IFieldOfView,
    IConfig,
    PreTestCallbackType, GetCostCallbackType,
    ConeType, ConeTypeString,
    BLOCKER
} from './IFieldOfView';
import { XYZType } from '../types';
import { IBaseBoard } from '../board/IBaseBoard';
import { WorldXY } from '../board'
import { DegToRad } from '../../utils/math/angle/DegToRad';

export class FieldOfView implements IFieldOfView {
    board: IBaseBoard;

    occupiedTest: boolean;
    blockerTest: boolean;
    edgeBlockerTest: boolean;
    preTestCallback: PreTestCallbackType,
    preTestCallbackScope: any;

    costCallback: GetCostCallbackType,
    costCallbackScope: any;
    constCost: number;

    startTileXYZ: XYZType;
    _face: number;
    faceAngle: number;
    coneMode: ConeType;
    _cone: number | undefined;
    coneRad: number;

    constructor({
        board = undefined,

        occupiedTest = false,
        blockerTest = false,
        edgeBlockerTest = false,
        preTestCallback = undefined,
        preTestCallbackScope = undefined,

        costCallback = undefined,
        costCallbackScope = undefined,
        cost = 1,

        face = 0,
        coneMode = ConeType.direction,
        cone = undefined
    }: IConfig = {}) {
        this.setBoard(board);

        this.setOccupiedTest(occupiedTest);
        this.setBlockerTest(blockerTest);
        this.setEdgeBlockerTest(edgeBlockerTest);

        this.setPreTestFunction(preTestCallback, preTestCallbackScope);
        if (costCallback) {
            this.setCostFunction(costCallback, costCallbackScope);
        } else {
            this.setConstCost(cost);
            this.setCostFunction();
        }
    }

    destroy() {
        this.shutdown();
        return this;
    }

    setBoard(
        board?: IBaseBoard
    ): this {

        this.board = board;
        return this;
    }

    get face(): number {
        return this._face;
    }

    set face(direction: number) {
        direction = this.board.grid.directionNormalize(direction);
        this._face = direction;
        if (this.coneMode === 0) { // Direction
            // Do nothing
        } else { // Angle
            var angle = WorldXY.AngleToward(this.board, this.chessData.tileXYZ, direction); // -PI~PI
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
        return this;
    }
    setConstCost(
        cost: number
    ): this {

        this.constCost = cost;
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

    get BLOCKER() {
        return BLOCKER;
    }
}