import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { GetTop } from './GetTop';

export function GetCenterY(
    gameobject: IContainer
): number {

    return GetTop(gameobject) + (gameobject.height / 2);
}