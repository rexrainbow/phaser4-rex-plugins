import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { StaticWorld } from '@phaserjs/phaser/world';

import { LoopInTicks } from '../../src';

class Demo extends Scene {
    constructor() {
        super();

        const loopInTicks = new LoopInTicks(this);

        loopInTicks
            .addNumberLoop('y', 0, 3)
            .addNumberLoop('x', 0, 3)
            .setCallback(function (loopIndexes, loopInTicks) {
                console.log(`${Math.floor(loopInTicks.progress * 100)} x:${loopIndexes.x}, y:${loopIndexes.y}`);
            })
            .once('complete', function () {
                console.log('complete')
            })
            .start();
    }
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);