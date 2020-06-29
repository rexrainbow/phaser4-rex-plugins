import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game, Scene } from '@phaserjs/phaser';
import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { Canvas } from '../../src/gameobjects/canvas/Canvas';
import { Fill } from '../../src/gameobjects/canvas/CanvasMethods';

class Demo extends Scene {
    constructor() {
        super();

        const world = new StaticWorld(this);
        const canvas = new Canvas(400, 300, 200, 200);
        AddChild(world, canvas);

        Fill(canvas, 'red');
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
