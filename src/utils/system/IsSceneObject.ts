import { Scene } from '@phaserjs/phaser/scenes/Scene'

export function IsSceneObject(object: any): boolean {

    return (object instanceof Scene);
}