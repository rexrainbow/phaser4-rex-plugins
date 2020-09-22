import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { Sprite, Text } from '@phaserjs/phaser/gameobjects';
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
            orientation: 'x',

            background: CreateBackground(),

            icon: CreateSprite('icon'),

            text: CreateText('Hello'),

            action: CreateSprite('icon'),

            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                icon: 10,
                text: 10
            }
        })

        const verticalLabel = new UI.Label({
            orientation: 'y',

            background: CreateBackground(),

            icon: CreateSprite('icon'),

            text: CreateText('World'),

            action: CreateSprite('icon'),

            space: {
                left: 20, right: 20, top: 20, bottom: 20,
                icon: 10,
                text: 10
            }
        })

        const horizontalLabelSizer = (new UI.Sizer({
            orientation: 'y',
        }))
            .add(CreateText('Horizontal Label'), { padding: { bottom: 30 } })
            .add(horizontalLabel)

        const verticalLabelSizer = (new UI.Sizer({
            orientation: 'y',
        }))
            .add(CreateText('Vertical Label'), { padding: { bottom: 30 } })
            .add(verticalLabel)

        const win = (new UI.Sizer({
            x: 400, y: 300,
            width: 600,

            orientation: 'x',
        }))
            //.addBackground(CreateBackground('blue', null, 0))
            .add(horizontalLabelSizer, { proportion: 1, expand: true, align: 'top_left' })
            .add(verticalLabelSizer, { proportion: 1, expand: true, align: 'top_right' })
            .layout();


        const world = new StaticWorld(this);
        AddChild(world, win);
    }
}

function CreateBackground(
    fillStyle: string | number = COLOR_DARK,
    strokeStyle: string | number = COLOR_LIGHT,
    radius: number = 20
) {

    return new UI.RoundRectangleCanvas({
        radius: radius,
        fillStyle: fillStyle,
        strokeStyle: strokeStyle,
        lineWidth: 3
    })
}

function CreateSprite(
    texture: string,
    frame?: string
): Sprite {

    return new Sprite(0, 0, texture, frame);
}

function CreateText(
    content: string = '',
    font: string = '30px monospace'
): Text {

    return new Text(0, 0, content, font);
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
