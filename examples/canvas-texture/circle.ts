import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game, Scene } from '@phaserjs/phaser';
import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { CreateCircleTexture } from '../../src/texture/canvastexture';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite/Sprite';

class Demo extends Scene {
    constructor() {
        super();

        CreateCircleTexture(
            'circle',
            100,
            100,
            'yellow', // Color            
            // function (canvas, context) {  // Return gradient
            //     let w = canvas.width,
            //         h = canvas.height,
            //         x = w / 2,
            //         y = h / 2;
            //     let grd = context.createRadialGradient(x, y, 0, x, y, w);
            //     grd.addColorStop(0, 'white');
            //     grd.addColorStop(1, 'black');
            //     return grd;
            // }
            'red',
            10
        )

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
