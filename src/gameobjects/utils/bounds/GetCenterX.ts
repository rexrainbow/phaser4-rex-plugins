import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';

export function GetCenterX(
    gameobject: IContainer
): number {

    return gameobject.x + ((0.5 - gameobject.originX) * gameobject.width);
}