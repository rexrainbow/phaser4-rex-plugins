import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite';

import { LifeTime } from '../../src';

class MySprite extends Sprite {
    lifeTime: LifeTime;

    constructor(world, x, y, texture, frame = undefined, lifeTime = 1000) {

        super(x, y, texture, frame);

        AddChild(world, this);
        this.lifeTime = new LifeTime(this, {
            lifeTime: lifeTime,
            destroy: true
        });

        this.lifeTime.start();
    }
}

class Demo extends Scene {
    constructor() {
        super();

        ImageFile('logo', '../assets/logo.png')
            .load()
            .then(() => {
                this.create();
            });
    }

    create() {
        const world = new StaticWorld(this);
        const obj = new MySprite(world, 400, 300, 'logo');

        obj.lifeTime.on('die', function () {
            console.log('Die');
        })

        // TODO: p4 bug : https://github.com/phaserjs/phaser/issues/10
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);