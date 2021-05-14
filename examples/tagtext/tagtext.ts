import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';

import { TagText } from '../../src'

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

        const s0 = `<style='size:30px;color:red;style:italic;underline:#fff'>Phaser</style><style='img:dude;underline:#fff'></style>
<style='size:20px;color:blue;style:bold;shadow:yellow'>is</style>
<style='size:40px;color:none;stroke:green'>Fun</style><style='size:20px;y:-12'>Fun</style>`;

        const text0 = new TagText(400, 200, s0,
            {
                backgroundStrokeStyle: 'BurlyWood',
                backgroundStrokeThickness: 4,
                cornerRadius: 20,
                padding: 10,
                images: ['dude']
            }
        );
        AddChild(world, text0);


        const s1 = `<class='line0'>Phaser</class><class='imgDude'></class>
<class='line1'>is</class>
<class='line2'>Fun</class><class='superscript'>Fun</class>`;

        const text1 = new TagText(400, 400, s1,
            {
                backgroundStrokeStyle: 'BurlyWood',
                backgroundStrokeThickness: 4,
                cornerRadius: 20,
                padding: 10,
                images: ['dude'],
                tags: {
                    line0: {
                        size: 30,
                        color: 'red',
                        style: 'italic',
                        underline: {
                            color: '#fff'
                        }
                    },
                    line1: {
                        size: 20,
                        color: 'blue',
                        style: 'bold',
                        shadow: {
                            color: 'yellow'
                        }
                    },
                    line2: {
                        size: 40,
                        color: 'none',
                        stroke: {
                            color: 'green'
                        }
                    },
                    imgDude: {
                        img: 'dude',
                        underline: {
                            color: '#fff'
                        }
                    },
                    superscript: {
                        size:20,
                        y: -12
                    }
                }
            }
        );
        AddChild(world, text1);
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
