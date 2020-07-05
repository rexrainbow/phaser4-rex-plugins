import {
    IBoardData,
    XType, YType, ZType
} from '../IBoardData';
import { GetChess } from './GetChess';

export let Contains = function (
    boardData: IBoardData,
    x: XType,
    y: YType,
    z: ZType
): boolean {

    return (GetChess(boardData, x, y, z) !== null);
}