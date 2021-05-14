import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { Keyboard } from '@phaserjs/phaser/input';
import { Once } from '@phaserjs/phaser/events'

class Demo extends Scene {
    constructor() {
        super();

        let i = 1000;
        const keyboard = new Keyboard.Keyboard();
        const onKeyDown = function (event) {
            if (i < 0) {
                return;
            }
            i--; // To prevent endless event firing
            console.log(`${event.key.toUpperCase()} key down`)
            Once(keyboard, 'keydown', onKeyDown);
        }
        Once(keyboard, 'keydown', onKeyDown);
    }
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
