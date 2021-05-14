import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { Sprite, Text } from '@phaserjs/phaser/gameobjects';

import { UI } from '../../src';
import { GetRandomWord } from '../../src/utils/string/GetRandomWord';

class Demo extends Scene {
    constructor() {
        super();


        const ui = new UI.Sizer({
            x: 400, y: 300,
            width: 750, height: 500,
            orientation: 'x'
        });
        for (let i = 0; i < 3; i++) {
            ui.add(
                CreateTable(), { proportion: 1, expand: true }
            )
        }
        ui.layout();

        const world = new StaticWorld(this);
        AddChild(world, ui);
    }
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

function CreateTable() {
    const table = new UI.Sizer({
        orientation: 'y'
    })
    table
        .add(CreateTitle())
        .add(CreateItems(), { proportion: 1, expand: true })
    return table;
}

function CreateTitle() {

    const title = new UI.Label({
        background: (new UI.RoundRectangleCanvas({
            radius: 14,
            fillStyle: COLOR_LIGHT
        })),

        text: (new Text(0, 0, GetRandomWord(3, 6), '20px monospace')),

        space: {
            left: 14,
            right: 14,
            top: 14,
            bottom: 14,
        }
    })
    return title;
}

function CreateItems() {
    const items = new UI.FixedWidthSizer({
        space: {
            left: 3,
            right: 3,
            top: 3,
            bottom: 3,
            item: 8,
            line: 8,
        }
    })
    for (let i = 0; i < 20; i++) {
        items.add(CreateItem());
    }

    return items;
}

function CreateItem() {

    const item = new UI.Label({
        background: (new UI.RoundRectangleCanvas({
            radius: 14,
            fillStyle: COLOR_PRIMARY
        })),

        text: (new Text(0, 0, GetRandomWord(3, 6), '18px monospace')),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
        }
    })
    return item;
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
