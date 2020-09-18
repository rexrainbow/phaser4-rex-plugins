import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { GetRight } from './GetRight';

export function SetRight(
    gameobject: IContainer,
    value: number
) {

    gameobject.x += (value - GetRight(gameobject));
}