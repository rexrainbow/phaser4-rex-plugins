import {
    ILogicBoard,
    XYType,
    ForEachTileXYCallback, ForEachTileXYOrder
} from '../ILogicBoard';

export let ForEachTileXY = function (
    board: ILogicBoard,
    callback: ForEachTileXYCallback,
    scope: any,
    order: ForEachTileXYOrder = ForEachTileXYOrder['x+,y+']
): void {

    let tileXY: XYType = { x: 0, y: 0 };
    switch (order) {
        case ForEachTileXYOrder['x+,y+']:
            for (let tileY = 0; tileY < board.height; tileY++) {
                for (let tileX = 0; tileX < board.width; tileX++) {
                    tileXY.x = tileX;
                    tileXY.y = tileY;
                    if (scope) {
                        callback.call(scope, tileXY, board);
                    } else {
                        callback(tileXY, board);
                    }
                }
            }
            break;

        case ForEachTileXYOrder['x-,y+']:
            for (let tileY = 0; tileY < board.height; tileY++) {
                for (let tileX = board.width - 1; tileX >= 0; tileX--) {
                    tileXY.x = tileX;
                    tileXY.y = tileY;
                    if (scope) {
                        callback.call(scope, tileXY, board);
                    } else {
                        callback(tileXY, board);
                    }
                }
            }
            break;

        case ForEachTileXYOrder['y+,x+']:
            for (let tileX = 0; tileX < board.width; tileX++) {
                for (let tileY = 0; tileY < board.height; tileY++) {
                    tileXY.x = tileX;
                    tileXY.y = tileY;
                    if (scope) {
                        callback.call(scope, tileXY, board);
                    } else {
                        callback(tileXY, board);
                    }
                }
            }
            break;

        case ForEachTileXYOrder['y-,x+']:
            for (let tileX = 0; tileX < board.width; tileX++) {
                for (let tileY = board.height - 1; tileY >= 0; tileY--) {
                    tileXY.x = tileX;
                    tileXY.y = tileY;
                    if (scope) {
                        callback.call(scope, tileXY, board);
                    } else {
                        callback(tileXY, board);
                    }
                }
            }
    }

};