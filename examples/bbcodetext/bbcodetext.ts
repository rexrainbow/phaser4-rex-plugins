import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { BBCodeText } from '../../src'

class Demo extends Scene {
    constructor() {
        super();

        const world = new StaticWorld(this);
        const text = new BBCodeText(400, 300);
        AddChild(world, text);

        text.backgroundStyle = 'aliceblue';
        text.padding = { left: 10, right: 10, top: 10, bottom: 10 };
        text.font = '40px monospace';
        text.text = `[color=red]A[color=blue]B[color=green]C[/color]`;

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
