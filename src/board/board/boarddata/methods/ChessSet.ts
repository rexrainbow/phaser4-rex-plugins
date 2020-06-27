import {
    ChessSetType,
    IChess,
    AnyKeyType
} from '../IBoardData';

export let AddChessToSet = function (
    chess: IChess,
    chessMap: Map<AnyKeyType, ChessSetType>,
    prevKey: AnyKeyType | undefined,
    currKey: AnyKeyType | undefined
): void {
    if (prevKey === currKey) {
        return;
    }

    if (prevKey !== undefined) {
        let chessSet = chessMap.get(prevKey);
        if (chessSet) {
            chessSet.delete(chess);
            if (chessSet.size === 0) {
                chessMap.delete(prevKey);
            }
        }
    }

    if (currKey !== undefined) {
        let chessSet = chessMap.get(currKey);
        if (chessSet) {
            chessSet.add(chess);
        } else {
            chessSet = new Set();
            chessSet.add(chess);
            chessMap.set(currKey, chessSet);
        }
    }
}

export let RemoveChessFromSet = function (
    chessMap: Map<AnyKeyType, ChessSetType>,
    key: AnyKeyType,
    chess: IChess
): void {

    let chessSet = chessMap.get(key);
    if (chessSet) {
        chessSet.delete(chess);
        if (chessSet.size === 0) {
            chessMap.delete(key);
        }
    }
}