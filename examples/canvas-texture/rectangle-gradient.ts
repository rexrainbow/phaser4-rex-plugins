import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { CreateRectangleTexture } from '../../src/texture/canvastexture';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite';

class Demo extends Scene {
    constructor() {
        super();

        CreateRectangleTexture(
            'rectangle',
            {
                width: 200,
                height: 100,
                fillStyle: 'black',
                fillColor2: 'white',
                strokeStyle: 'blue',
                lineWidth: 10
            }
        )

        const world = new StaticWorld(this);
        const image = new Sprite(400, 300, 'rectangle');
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
