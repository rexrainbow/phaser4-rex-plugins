import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { GetCenterX } from './GetCenterX';

export function SetCenterX(
    gameobject: IContainer,
    value: number
) {

    gameobject.x += (value - GetCenterX(gameobject));
}