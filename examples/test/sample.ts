import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';

import { AddChild } from '@phaserjs/phaser/display/';
import { ImageFile } from '@phaserjs/phaser/loader/files/ImageFile';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite';
import { StaticWorld } from '@phaserjs/phaser/world';

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
        const logo = new Sprite(400, 300, 'logo');
        AddChild(world, logo);
    }
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
