import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';
import { On } from '@phaserjs/phaser/events';

import { BBCodeText } from '../../src';

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

        const text = new BBCodeText(400, 300, '',
            {
                width: 140, height: 240,
                padding: 20,
                wrapMode: 'char',

                backgroundStrokeStyle: 'BurlyWood',
                backgroundStrokeThickness: 4,
                cornerRadius: 20,

                images: ['dude']
            }
        );

        AddChild(world, text);

        const sArr = [];
        for (let i = 0; i < 100; i++) {
            let s = (i % 5 === 0) ? `[size=30][color=red]${i}[img=dude]` : `[size=20][color=green]${i}`
            sArr.push(s);
        }
        text.setText(sArr);

        // TODO: Replace scrolling by tween
        let duration = 20 * 1000;
        let reverse = false;
        let progress = 0;
        On(world, 'update', function (delta: number) {
            progress += (reverse) ? -delta : delta;

            if (progress < 0) {
                progress = 0;
                reverse = false;
            } else if (progress > duration) {
                progress = duration;
                reverse = true;
            }
            text
                .setTextScrollY(progress / duration, true)
                .updateText(false); // Don't wrap text, only draw text
        })
    }
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
