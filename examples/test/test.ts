import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';

import { CreateRectangleTexture } from '../../src/texture/canvastexture';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite';

import { DegToRad } from '@phaserjs/phaser/math/DegToRad'
import { On } from '@phaserjs/phaser/events'

class Demo extends Scene {
    constructor() {
        super();


        CreateRectangleTexture(
            'rect0',
            {
                width: 100,
                height: 100,
                strokeStyle: 'aliceblue',
                lineWidth: 10
            }
        )

        CreateRectangleTexture(
            'rect1',
            {
                width: 20,
                height: 20,
                fillStyle:'red'
            }
        )

        const world = new StaticWorld(this);
        const img0 = new Sprite(400, 300, 'rect0');
        AddChild(world, img0);

        const img1 = new Sprite(450, 300, 'rect1');
        AddChild(img0, img1);

        // On(world, 'update', function (delta: number) {
        //     img0.rotation += DegToRad(delta * 100 / 1000);
        // })

    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
