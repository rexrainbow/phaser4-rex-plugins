import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game, Scene } from '@phaserjs/phaser';
import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { Canvas } from '../../src/gameobjects/canvas';

class Demo extends Scene {
    constructor() {
        super();

        const world = new StaticWorld(this);
        const canvas = new Canvas(400, 300, 200, 100);
        AddChild(world, canvas);

        let ctx = canvas.getContext();
        let grd = ctx.createLinearGradient(0, 50, 200, 50);
        grd.addColorStop(0, 'blue');
        grd.addColorStop(1, 'red');
        canvas.fill(grd);
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
