import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';

import { BBCodeText } from '../../src';
import { GetRandomWord } from '../../src/utils/string/GetRandomWord';

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

        const s = GetRandomWord(1000);

        const text = new BBCodeText(400, 300, s,
            {
                width: 140, height: 140,
                padding: 20,
                wrapMode: 'char',

                backgroundStrokeStyle: 'BurlyWood',
                backgroundStrokeThickness: 4,
                cornerRadius: 20
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
