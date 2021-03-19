import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { Sprite, SetTint, SetAlpha } from '@phaserjs/phaser/gameobjects/sprite';

import { Board, HexagonGrid, FieldOfView, CreateTileTexture } from '../../src/board';
import { Shuffle } from '../../src/utils/array/Shuffle';

class Chess extends Sprite {
    fov: FieldOfView;
}

class MyBoard extends Board {
    world: StaticWorld;


    constructor(config) {
        super(config);

        CreateTileTexture(this, 'tile', undefined, 'white', 1);
        CreateTileTexture(this, 'chess', 'white');
    }

    setWorld(world: StaticWorld): this {

        this.world = world;
        return this;
    }

    strokeGrid(): this {

        this.forEachTileXY((tileXY) => {
            let worldXY = this.tileXYToWorldXY(tileXY.x, tileXY.y, true);
            let tile = new Sprite(worldXY.x, worldXY.y, 'tile');
            AddChild(this.world, tile);
        })
        return this;
    }

    createChess(
        x: number,
        y: number,
        z: number,
        color?: number
    ) {

        let chess = new Chess(0, 0, 'chess');
        AddChild(this.world, chess);
        if (color !== undefined) {
            SetTint(color, chess);
        }
        this.addChess(chess, x, y, z);
        return chess;
    }

}

class Demo extends Scene {
    constructor() {
        super();

        const world = new StaticWorld(this);

        const board = new MyBoard({
            grid: (new HexagonGrid({
                x: 40, y: 40,
                cellWidth: 30, cellHeight: 36
            })),

            width: 18, height: 18
        })
        board
            .setWorld(world)
            .strokeGrid();

        // Add chess
        let chessA = board.createChess(9, 9, 1, 0xffffff);
        // Add some blockers (z=1, to block chessA)
        let emptyTileXYArray = Shuffle(board.getEmptyTileXYArray(1))
        for (let i = 0; i < 30; i++) {
            let emptyTileXY = emptyTileXYArray[i];
            board.createChess(emptyTileXY.x, emptyTileXY.y, 1, 0x808080);
        }

        chessA.fov = new FieldOfView({
            chess: chessA,
            face: 3,
            cone: 2,
            occupiedTest: true
        })
        let tileXYArray = chessA.fov.findFOV();
        tileXYArray.forEach((tileXY) => {
            let marker = board.createChess(tileXY.x, tileXY.y, -1, 0x400000);
            SetAlpha(0.5, marker);
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
