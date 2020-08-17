import { IGameObject } from '@phaserjs/phaser/gameobjects/IGameObject';

export function IsPointInBounds(
    gameObject: IGameObject,
    x: number,
    y: number,
    preTest: ((gameObject: IGameObject, x: number, y: number) => boolean),
    postTest: ((gameObject: IGameObject, x: number, y: number) => boolean)
): boolean {

    // Can't get bounds
    if (!gameObject) {
        return false;
    }

    if (preTest && !preTest(gameObject, x, y)) {
        return false;
    }

    if (!gameObject.bounds.get().contains(x, y)) {
        return false;
    }

    if (postTest && !postTest(gameObject, x, y)) {
        return false;
    }

    return true;
}