import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';

import { CreateRectangleTexture } from '../../src/texture/canvastexture';
import { Sprite, Text } from '@phaserjs/phaser/gameobjects';

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
                fillStyle: 'red'
            }
        )

        const world = new StaticWorld(this);
        const img0 = new Sprite(400, 300, 'rect0');
        AddChild(world, img0);

        const localXY = img0.transform.globalToLocal(450, 300);
        const img1 = new Sprite(localXY.x, localXY.y, 'rect1'); // Related position        
        AddChild(img0, img1);

        const print = new Text(0, 600, '');
        print.setOrigin(0, 1);
        AddChild(world, print);


        // TODO: Replace rotation, moving by tween
        const maxProgress = 3000;
        let progress = 0,
            reverse = false;
        On(world, 'update', function (delta: number) {
            img0.rotation += DegToRad((delta / 1000) * 50);

            progress += (!reverse) ? delta : -delta;
            if (progress >= maxProgress) {
                progress = maxProgress;
                reverse = true;
            } else if (progress <= 0) {
                progress = 0;
                reverse = false;
            }
            img1.x = 50 + (progress / maxProgress) * 100;

            let worldXY = img1.transform.localToGlobal(img1.x, img1.y);
            print.setText([
                `Local: ${Math.floor(img1.x)}|${Math.floor(img1.y)}`,
                `World: ${Math.floor(worldXY.x)}|${Math.floor(worldXY.y)}`
            ]);
        })

    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
