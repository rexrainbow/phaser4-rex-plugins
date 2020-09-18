import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { Sprite, Text } from '@phaserjs/phaser/gameobjects';
import { SetTint } from '@phaserjs/phaser/gameobjects/sprite';
import { Between } from '@phaserjs/phaser/math/Between';
import { CreateRectangleTexture } from '../../src/texture/canvastexture';

import { UI } from '../../src';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Scene {
    constructor() {
        super();

        CreateRectangleTexture(
            'icon',
            {
                width: 32,
                height: 32,
                fillStyle: 'white',
            }
        )

        const horizontalLabel = new UI.Label({
            x: 300, y: 300,

            orientation: 'x',

            background: (new UI.RoundRectangleCanvas({
                radius: 20,
                fillStyle: COLOR_DARK,
                strokeStyle: COLOR_LIGHT,
                lineWidth: 3
            })),

            icon: (new Sprite(0, 0, 'icon')),

            text: (new Text(0, 0, 'Hello', '30px monospace')),

            action: (new Sprite(0, 0, 'icon')),

            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                icon: 10,
                text: 10
            }
        })
            .layout();

        const verticalLabel = new UI.Label({
            x: 500, y: 300,

            orientation: 'y',

            background: (new UI.RoundRectangleCanvas({
                radius: 20,
                fillStyle: COLOR_DARK,
                strokeStyle: COLOR_LIGHT,
                lineWidth: 3
            })),

            icon: (new Sprite(0, 0, 'icon')),

            text: (new Text(0, 0, 'World', '30px monospace')),

            action: (new Sprite(0, 0, 'icon')),

            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                icon: 10,
                text: 10
            }
        })
            .layout();

        const world = new StaticWorld(this);
        AddChild(world, horizontalLabel);
        AddChild(world, verticalLabel);
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
