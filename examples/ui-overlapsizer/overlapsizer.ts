import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';

import { Text } from '@phaserjs/phaser/gameobjects';
import { UI } from '../../src';

class Demo extends Scene {
    constructor() {
        super();


        const ui = new UI.OverlapSizer({
            x: 400, y: 300,
            width: 300, height: 300
        });

        ui
            .add(
                (new UI.RoundRectangleCanvas({ radius: 20, fillStyle: COLOR_PRIMARY })),
                { key: 'main', expand: true }
            )
            .add(
                (new UI.RoundRectangleCanvas({ width: 40, radius: 20, fillStyle: COLOR_DARK })),
                { key: 'right', align: 'right_center', expand: { height: true } }
            )
            .add(
                (new UI.RoundRectangleCanvas({ width: 40, height: 40, radius: 20, fillStyle: COLOR_LIGHT })),
                { key: 'bottom', align: 'bottom_center', expand: false }
            )
            .add(
                (new UI.Label({
                    background: (new UI.RoundRectangleCanvas({ radius: 20, fillStyle: COLOR_DARK })),
                    icon: (new UI.RoundRectangleCanvas({ width: 24, height: 24, radius: 10, fillStyle: COLOR_LIGHT })),
                    text: (new Text(0, 0, 'start')),
                    space: { left: 20, right: 20, top: 20, bottom: 20, icon: 10 }
                })),
                { key: 'center', align: 'center', expand: false }
            )
        ui.layout();

        const world = new StaticWorld(this);
        AddChild(world, ui);
    }
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

new Game(
    WebGL(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
