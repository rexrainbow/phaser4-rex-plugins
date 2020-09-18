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

        const ui = CreateTable('Items', 5)
            .layout()
            .setPosition(400, 300);

        const world = new StaticWorld(this);
        AddChild(world, ui);
    }
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

function CreateItem(name: string): UI.Sizer {

    const icon = new Sprite(0, 0, 'icon');
    SetTint(Between(0, 0x1000000), icon);

    const text = new Text(0, 0, name, '30px monospace');

    const ui = (new UI.Sizer({
        space: {
            item: 10
        },
        orientation: 'x'
    }))
        .add(icon)
        .add(text)

    return ui;
}

function CreateTable(
    title = "Table",
    itemCount: number = 3
): UI.Sizer {

    const ui = new UI.Sizer({
        space: {
            left: 20, right: 20, top: 20, bottom: 20,
            item: 10
        },
        orientation: 'y'
    });

    const background = new UI.RoundRectangleCanvas({
        radius: 20,
        fillStyle: COLOR_DARK,
        strokeStyle: COLOR_LIGHT,
        lineWidth: 3
    });

    ui.addBackground(background);

    const text = new Text(0, 0, title, '36px monospace');
    ui.add(text, {
        padding: { bottom: 10 }
    });

    for (let i = 0; i < itemCount; i++) {
        ui.add(CreateItem(`Item${i}`));
    }

    return ui;
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
