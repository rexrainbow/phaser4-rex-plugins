import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { GetBottom } from './GetBottom';

export function SetBottom(
    gameobject: IContainer,
    value: number
) {

    gameobject.x += (value - GetBottom(gameobject));
}