import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';
import { GetLeft } from './GetLeft';

export function GetCenterX(
    gameobject: IContainer
): number {

    return GetLeft(gameobject) + (gameobject.width / 2);
}