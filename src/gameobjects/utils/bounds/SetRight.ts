import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { GetTop } from './GetTop';

export function SetRight(
    gameobject: IContainer,
    value: number
) {

    gameobject.x += (value - GetTop(gameobject));
}