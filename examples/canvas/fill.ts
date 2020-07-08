import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { AddChild } from '@phaserjs/phaser/display/';
import { StaticWorld } from '@phaserjs/phaser/world';
import { CanvasBase, Fill, GenerateTexture } from '../../src/gameobjects/canvas';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite';

class Demo extends Scene {
    constructor() {
        super();

        const world = new StaticWorld(this);

        const canvas = new CanvasBase(400, 300, 200, 100);
        AddChild(world, canvas);

        const grd = canvas.context.createLinearGradient(0, 50, 200, 50);
        grd.addColorStop(0, 'blue');
        grd.addColorStop(1, 'red');
        Fill(canvas, grd);

        // Create texture from canvas
        GenerateTexture(canvas, 'rect');
        const image = new Sprite(0, 0, 'rect');
        image.setOrigin(0);
        AddChild(world, image);
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
