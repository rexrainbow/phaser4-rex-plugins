import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
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

        const s = `[size=30][color=red][i][u]Phaser[/i][img=dude][/u]
[size=20][color=blue][shadow=yellow][b]is[/b][/shadow]
[size=40][color=none][stroke=green]Fun`;

        const text = new BBCodeText(400, 300, s,
            {
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
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
