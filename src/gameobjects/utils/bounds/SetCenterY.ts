import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { GetCenterY } from './GetCenterY';

export function SetCenterY(
    gameobject: IContainer,
    value: number
) {

    gameobject.y += (value - GetCenterY(gameobject));
}