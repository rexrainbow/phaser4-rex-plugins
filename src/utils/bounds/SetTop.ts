import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { GetLeft } from './GetLeft';

export function SetTop(
    gameobject: IContainer,
    value: number
) {

    gameobject.x += (value - GetLeft(gameobject));
}