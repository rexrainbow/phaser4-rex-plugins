import {
    ILogicBoard,
    XType, YType, ZType
} from '../ILogicBoard';

export let Contains = function (
    board: ILogicBoard,
    tileX: XType,
    tileY: YType,
    tileZ?: ZType
): boolean {

    let result: boolean;
    if (board.infinityMode) {
        result = true;
    } else {
        result = (tileX >= 0) && (tileX < board.width) &&
            (tileY >= 0) && (tileY < board.height);
    }
    if (result && (tileZ !== undefined)) {
        result = board.boardData.contains(tileX, tileY, tileZ);
    }
    return result;
};