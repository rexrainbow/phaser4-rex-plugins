import { IFieldOfView, ConeType } from './IFieldOfView';
import { XYType } from '../types';
import { TileXY, WorldXY } from '../board';

export let IsInCone = function (
    fov: IFieldOfView,
    targetTileXY: XYType
): boolean {

    if (fov.cone === undefined) {
        return true;
    }

    if (fov.coneMode === ConeType.direction) { // Direction
        return TileXY.IsDirectionInCone(fov.board, fov.startTileXYZ, targetTileXY, fov.face, fov.cone);
    } else { // Angle
        return WorldXY.IsAngleInCone(fov.board, fov.startTileXYZ, targetTileXY, fov.faceAngle, fov.coneRad);
    }
}