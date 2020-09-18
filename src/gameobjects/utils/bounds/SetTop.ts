import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { GetTop } from './GetTop';

export function SetTop(
    gameobject: IContainer,
    value: number
) {

    gameobject.y += (value - GetTop(gameobject));
}