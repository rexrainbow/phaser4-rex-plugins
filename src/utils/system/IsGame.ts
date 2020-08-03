import { Game } from '@phaserjs/phaser/Game'

export function IsGame(object: any): boolean {

    return (object instanceof Game);
}