import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { CreateRectangleTexture } from '../../src/texture/canvastexture';
import { Text } from '@phaserjs/phaser/gameobjects';
import { SpriteBatch } from '@phaserjs/phaser/gameobjects';
import { CanvasObjectToBitmap } from '../../src/data/canvasdata/CanvasObjectToBitmap'

class Demo extends Scene {
    constructor() {
        super();

        const dotSize = 4;
        CreateRectangleTexture(
            'dot',
            {
                width: dotSize,
                height: dotSize,
                fillStyle: 'white'
            }
        )

        const world = new StaticWorld(this);

        const txt = new Text(0, 0, 'Hello', '40px Comic Sans MS');
        const image = new SpriteBatch((txt.width * txt.height), 'dot');

        const offsetX = (800 - (txt.width * dotSize)) / 2;
        const offsetY = (600 - (txt.height * dotSize)) / 2;
        CanvasObjectToBitmap(txt)
            .forEachNonZero(function (value, x, y) {

                image.add({
                    x: (offsetX + (x * dotSize)),
                    y: (offsetY + (y * dotSize)),
                    tint: 0xFFE4C4
                })
            })

        AddChild(world, image);

        txt.setOrigin(0);
        AddChild(world, txt); 
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
