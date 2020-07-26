import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { BBCodeText } from '../../src'

class Demo extends Scene {
    constructor() {
        super();

        const s = `[color=red][size=30]Phaser
[color=blue][size=20]is
[size=40][color=green]Fun[/color]`;

        const text = new BBCodeText(400, 300, s,
            {
                backgroundStrokeStyle: 'BurlyWood',
                backgroundStrokeThickness: 4,
                cornerRadius: 20,
                padding: 10,

                fontFamily: 'monospace',
                fontSize: 40
            }
        );

        const world = new StaticWorld(this);
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
