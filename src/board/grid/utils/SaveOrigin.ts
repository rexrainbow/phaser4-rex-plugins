import { IGrid } from '../IGrid';

export function SaveOrigin(
    grid: IGrid
): void {
    grid._savedOriginX = grid.x;
    grid._savedOriginY = grid.y;
}

export function RestoreOrigin(
    grid: IGrid
): void {
    grid.x = grid._savedOriginX;
    grid.y = grid._savedOriginY;
}