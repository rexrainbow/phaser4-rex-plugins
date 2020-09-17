import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';

export function GetCenterY(
    gameobject: IContainer
): number {

    return gameobject.y + ((0.5 - gameobject.originY) * gameobject.height);
}