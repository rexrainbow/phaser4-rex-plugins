import { IContainer } from '@phaserjs/phaser/gameobjects/container/IContainer';

export function GetBottom(
    gameobject: IContainer
): number {

    return gameobject.y + ((1 - gameobject.originY) * gameobject.height);
}