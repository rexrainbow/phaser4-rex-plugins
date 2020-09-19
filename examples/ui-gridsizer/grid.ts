import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { Sprite } from '@phaserjs/phaser/gameobjects';
import { SetTint } from '@phaserjs/phaser/gameobjects/sprite/SetTint';
import { CreateRectangleTexture } from '../../src/texture/canvastexture';
import { Between } from '@phaserjs/phaser/math/Between';

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

        const ui = new UI.GridSizer({
            width: 600, height: 600,
            column: 10,
            row: 10,
            columnProportions: 1,
            rowProportions: 1,
            space: {
                left: 10, right: 10, top: 10, bottom: 10,
                column: 10, row: 10
            }
        })
        ui.addBackground(
            CreateSprite('icon', undefined, 0x191970)
        )
        ui.forEachEmptyGrid(function (c, r, sizer) {
            sizer.add(
                CreateSprite('icon', undefined, Between(0, 0x1000000)),
                { column: c, row: r }
            )

        })

        ui
            .layout()
            .setPosition(400, 300);

        const world = new StaticWorld(this);
        AddChild(world, ui);
    }
}

function CreateSprite(
    texture: string,
    frame?: string,
    tint?: number
): Sprite {

    const sprite = new Sprite(0, 0, texture, frame);
    if (tint !== undefined) {
        SetTint(tint, sprite);
    }
    return sprite;
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
