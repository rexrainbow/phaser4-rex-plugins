import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite';

import { LifeTime } from '../../src';

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
        const obj = new Sprite(400, 300, 'logo');
        AddChild(world, obj);

        const lifeTime = new LifeTime(obj, {
            lifeTime: 1000,
            destroy: true
        })
        lifeTime.start();

        // TODO: p4 bug : https://github.com/phaserjs/phaser/issues/10
    }
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);