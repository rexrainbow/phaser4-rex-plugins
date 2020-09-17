import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { GetLeft } from './GetLeft';

export function SetLeft(
    gameobject: IContainer,
    value: number
) {

    gameobject.x += (value - GetLeft(gameobject));
}