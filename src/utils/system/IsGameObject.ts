import { GameObject } from '@phaserjs/phaser/gameobjects/GameObject'

export function IsGameObject(object: any): boolean {

    return (object instanceof GameObject);
}