import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { CanvasRoundRectangle } from '../../src';

class Demo extends Scene {
    constructor() {
        super();

        const rect = new CanvasRoundRectangle({
            radius: 20,
            fillStyle: 'rgba(0,0,0,0.5)',
            fillColor2: 'rgba(100,100,100,0.5)',
            strokeStyle: 'yellow',
            lineWidth: 5
        });
        rect
            .setPosition(400, 300)
            .resize(200, 100);

        const world = new StaticWorld(this);
        AddChild(world, rect);
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
