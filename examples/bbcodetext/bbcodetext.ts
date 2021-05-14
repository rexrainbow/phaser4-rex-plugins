import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';

import { BBCodeText } from '../../src'

class Demo extends Scene {
    constructor() {
        super();

        ImageFile('dude', '../assets/phaser-dude.png')
            .load()
            .then(() => {
                this.create();
            });
    }

    create() {
        const world = new StaticWorld(this);

        const s = `[size=20]1[y=-4]2[y=-8]3[y=-12]4[y=-16]5[/y]6[/size][size=40] [/size]
[size=30][color=red][i][u]Phaser[/i][img=dude][/u]
[size=20][color=blue][shadow=yellow][b]is[/b][/shadow]
[size=40][color=none][stroke=green]Fun`;

        const text = new BBCodeText(400, 300, s,
            {
                backgroundFillStyle: 'rgba(100, 100, 100, 0.5)',
                backgroundFillColor2: 'rgba(0, 0, 0, 0.5)',
                backgroundStrokeStyle: 'BurlyWood',
                backgroundStrokeThickness: 4,
                cornerRadius: 20,
                padding: 10,
                images: ['dude']
            }
        );
        AddChild(world, text);
    }
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
