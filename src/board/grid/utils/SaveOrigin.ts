import { IGrid } from '../IGrid';

export let SaveOrigin = function (
    grid: IGrid
): void {
    grid._savedOriginX = grid.x;
    grid._savedOriginY = grid.y;
}

export let RestoreOrigin = function (
    grid: IGrid
): void {
    grid.x = grid._savedOriginX;
    grid.y = grid._savedOriginY;
}