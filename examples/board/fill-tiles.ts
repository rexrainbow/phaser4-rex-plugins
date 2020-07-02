import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game, Scene } from '@phaserjs/phaser';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite/Sprite';
import { Board, HexagonGrid } from '../../src/board';
import { CreatePolygonTexture } from '../../src/texture/canvastexture'

class Demo extends Scene {
    constructor() {
        super();

        const world = new StaticWorld(this);

        const board = new Board({
            grid: (new HexagonGrid({
                x: 80, y: 80,
                cellWidth: 42, cellHeight: 48
            })),

            width: 10, height: 10
        })

        CreatePolygonTexture('tile', {
            points: board.getGridPoints(),
            strokeStyle: 'white'
        })

        board.forEachTileXY(function (tileXY) {
            let tile = new Sprite(0, 0, 'tile');
            AddChild(world, tile);

            board.addChess(tile, tileXY.x, tileXY.y, 0);
        })
    }
}

new Game(
    WebGLRenderer(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
