import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { Sprite } from '@phaserjs/phaser/gameobjects/sprite';
import { Board, HexagonGrid, CreateTileTexture, HexagonMap } from '../../src/board';

class Demo extends Scene {
    constructor() {
        super();

        const world = new StaticWorld(this);

        const board = new Board({
            grid: (new HexagonGrid({
                x: 80, y: 80,
                cellWidth: 60, cellHeight: 68
            })),

            width: 8, height: 8
        })

        CreateTileTexture(board, 'tile', undefined, 'white', 2);

        let tileXYArray = board.fit(HexagonMap.GetHexagonMap(board, 4));
        tileXYArray.forEach((tileXY) => {
            let tile = new Sprite(0, 0, 'tile');
            AddChild(world, tile);
            board.addChess(tile, tileXY.x, tileXY.y, 0);
        });
    }
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
