import { IChess, AnyKeyType, ChessSetType } from '../../../Types';
import { FreeEmptySet, GetEmptySet } from '../../../../utils/pool/EmptySet';

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
                FreeEmptySet(chessSet); // Add to EmptySet pool
                chessMap.delete(prevKey);
            }
        }
    }

    if (currKey !== undefined) {
        let chessSet = chessMap.get(currKey);
        if (chessSet) {
            chessSet.add(chess);
        } else {
            chessSet = GetEmptySet(); // Request an empty set
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
            FreeEmptySet(chessSet); // Add to EmptySet pool
            chessMap.delete(key);
        }
    }
}