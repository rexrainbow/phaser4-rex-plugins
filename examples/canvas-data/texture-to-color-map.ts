import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { AddChild } from '@phaserjs/phaser/display/';
import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';
import { StaticWorld } from '@phaserjs/phaser/world';
import { CreateRectangleTexture } from '../../src/texture/canvastexture';
import { Sprite } from '@phaserjs/phaser/gameobjects';
import { SpriteBatch } from '@phaserjs/phaser/gameobjects';
import { TextureToColorMap } from '../../src/data/canvasdata/TextureToColorMap'

class Demo extends Scene {

    constructor() {
        super();

        ImageFile('mushroom', '../assets/mushroom.png')
            .load()
            .then(() => {
                this.create();
            });
    }

    create() {
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
        const sprite = new Sprite(0, 0, 'mushroom');

        const image = new SpriteBatch((sprite.width * sprite.height), 'dot');

        const offsetX = (800 - (sprite.width * dotSize)) / 2;
        const offsetY = (600 - (sprite.height * dotSize)) / 2;
        TextureToColorMap(sprite)
            .forEachNonZero(function (value, x, y) {

                image.add({
                    x: (offsetX + (x * dotSize)),
                    y: (offsetY + (y * dotSize)),
                    tint: value
                })
            })

        AddChild(world, image);

        sprite.setOrigin(0);
        AddChild(world, sprite); 
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
