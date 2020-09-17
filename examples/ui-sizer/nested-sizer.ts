import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { Sprite, Text } from '@phaserjs/phaser/gameobjects';
import { SetTint } from '@phaserjs/phaser/gameobjects/sprite';
import { Between } from '@phaserjs/phaser/math/Between';
import { CreateRectangleTexture } from '../../src/texture/canvastexture';

import { Sizer } from '../../src';

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

function CreateItem(name: string): Sizer {

    const icon = new Sprite(0, 0, 'icon');
    SetTint(Between(0, 0x1000000), icon);

    const text = new Text(0, 0, name, '30px monospace');

    const ui = (new Sizer({
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
): Sizer {

    const ui = new Sizer({
        space: {
            item: 10
        },
        orientation: 'y'
    });

    const text = new Text(0, 0, title, '36px monospace');
    ui.add(text, {
        padding: { bottom: 5 }
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