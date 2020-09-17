import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { GetBottom } from './GetBottom';

export function SetBottom(
    gameobject: IContainer,
    value: number
) {

    gameobject.y += (value - GetBottom(gameobject));
}