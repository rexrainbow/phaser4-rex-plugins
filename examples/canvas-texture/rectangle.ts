import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game, Scene } from '@phaserjs/phaser';
import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { CreateRectangleTexture } from '../../src/texture/canvastexture';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite/Sprite';

class Demo extends Scene {
    constructor() {
        super();

        CreateRectangleTexture(
            'rectangle',
            {
                width: 100,
                height: 100,
                fillStyle: '#DC143C',
                strokeStyle: '#00FFFF',
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
