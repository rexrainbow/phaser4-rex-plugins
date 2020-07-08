import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { DrawCanvasTexture } from '../../src/texture/canvastexture';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite';

class Demo extends Scene {
    constructor() {
        super();

        // Draw on a canvas and put it into texture manager
        DrawCanvasTexture('circle', function (canvas, context) {
            canvas.width = 200;
            canvas.height = 200;

            context.beginPath();
            context.arc(100, 100, 100, 0, 2 * Math.PI);

            let grd = context.createLinearGradient(0, 100, 200, 100);
            grd.addColorStop(0, 'blue');
            grd.addColorStop(1, 'red');

            context.fillStyle = grd;
            context.fill();
        });

        const world = new StaticWorld(this);
        const image = new Sprite(400, 300, 'circle');
        AddChild(world, image);
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
