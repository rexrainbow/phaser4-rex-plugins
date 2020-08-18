import { DirMode, DirectionsTyps } from './types';
import { AngleToDirections } from './AngleToDirections';
import { RadToDeg } from '@phaserjs/phaser/math/RadToDeg';

export function RotationToDirection(
    rotation: number,
    dirMode: DirMode,
    out: DirectionsTyps | true
): DirectionsTyps {

    return AngleToDirections(RadToDeg(rotation), dirMode, out);
}