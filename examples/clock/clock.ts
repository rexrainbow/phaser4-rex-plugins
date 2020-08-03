import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { Text } from '@phaserjs/phaser/gameobjects';
import { StaticWorld } from '@phaserjs/phaser/world';
import { Mouse } from '@phaserjs/phaser/input/mouse';
import { On } from '@phaserjs/phaser/events'

import { Clock } from '../../src';


class Demo extends Scene {
    constructor() {
        super();

        const world = new StaticWorld(this);
        const print = new Text(100, 100, '');
        print.setOrigin(0);
        AddChild(world, print);

        const clock = new Clock(this);
        clock.start();

        // Pause/resume clock
        const mouseInput = new Mouse();
        On(mouseInput, 'pointerdown', clock.pause, clock);
        On(mouseInput, 'pointerup', clock.resume, clock);

        // Display current clock time
        On(this, 'update', function () {
            print.text = (clock.now * 0.001).toString();
        })

        const hint = new Text(0, 580, 'Mouse pointer-down to pause cloc');
        hint.setOrigin(0);
        AddChild(world, hint);
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);