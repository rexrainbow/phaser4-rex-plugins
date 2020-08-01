import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';
import { StaticWorld } from '@phaserjs/phaser/world';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite';

import { MaskedImage } from '../../src'

class Demo extends Scene {
    constructor() {
        super();

        ImageFile('img', '../assets/rectangle128x96.jpg')
            .load()
            .then(() => {
                this.create();
            });
    }

    create() {
        const world = new StaticWorld(this);

        const src = new Sprite(0, 0, 'img');
        src.setOrigin(0);
        AddChild(world, src);

        // Image with circle/ellipse/round rectangle mask
        const circleMaskImage = new MaskedImage(200, 200, 'img');
        AddChild(world, circleMaskImage);

        const ellipseMaskImage = new MaskedImage(400, 200, 'img', undefined, 'ellipse');
        AddChild(world, ellipseMaskImage);

        const roundRectangleMaskImage = new MaskedImage(600, 200, 'img', undefined, {
            maskType: 'roundRectangle',
            radius: 20
        });
        AddChild(world, roundRectangleMaskImage);

        // Image with circle/ellipse/round rectangle mask + background
        const circleMaskImageWBG = new MaskedImage(200, 400, 'img', undefined, {
            maskType: 'circle',
            backgroundStyle: 'yellow'
        });
        AddChild(world, circleMaskImageWBG);

        const ellipseMaskImageWBG = new MaskedImage(400, 400, 'img', undefined, {
            maskType: 'ellipse',
            backgroundStyle: 'yellow'
        });
        AddChild(world, ellipseMaskImageWBG);

        const roundRectangleMaskImageWBG = new MaskedImage(600, 400, 'img', undefined, {
            maskType: 'roundRectangle',
            radius: 20,
            backgroundStyle: 'yellow'
        });
        AddChild(world, roundRectangleMaskImageWBG);
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
