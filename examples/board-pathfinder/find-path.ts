import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game, Scene } from '@phaserjs/phaser';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { Sprite, SetTint, SetAlpha } from '@phaserjs/phaser/gameobjects/sprite';
import { Text } from '@phaserjs/phaser/gameobjects/text'

import { Board, HexagonGrid, PathFinder } from '../../src/board';
import { CreatePolygonTexture } from '../../src/texture/canvastexture';
import { Shuffle } from '../../src/utils/array/Shuffle';

class MyBoard extends Board {
    world: StaticWorld;
    pathFinder: PathFinder;

    constructor(config) {
        super(config);

        this.pathFinder = new PathFinder({
            board: this,
            pathMode: 'astar',
            occupiedTest: true
        });

        CreatePolygonTexture('tile', {
            points: this.getGridPoints(),
            strokeStyle: 'white',
            lineWidth: 1,
            lineJoin: 'miter'
        })

        CreatePolygonTexture('chess', {
            points: this.getGridPoints(),
            fillStyle: 'white'
        })
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

        let chess = new Sprite(0, 0, 'chess');
        AddChild(this.world, chess);
        if (color !== undefined) {
            SetTint(color, chess);
        }
        this.addChess(chess, x, y, z);
        return chess;
    }

    findPath(
        startChess,
        endChess,
        isClosest = true
    ) {
        return this.pathFinder.findPath(startChess, endChess, undefined, isClosest);
    }
}

class Demo extends Scene {
    constructor() {
        super();

        const world = new StaticWorld(this);

        const board = new MyBoard({
            grid: (new HexagonGrid({
                x: 40, y: 40,
                cellWidth: 40, cellHeight: 48
            })),

            width: 10, height: 10
        })
        board
            .setWorld(world)
            .strokeGrid();

        // Add start chess
        let chessA = board.createChess(2, 2, 1, 0xffffff);
        // Add end chess
        let chessB = board.createChess(8, 8, 1, 0xff0000);
        // Add some blockers (z=1, to block chessA)
        let emptyTileXYArray = Shuffle(board.getEmptyTileXYArray(1))
        for (let i = 0; i < 30; i++) {
            let emptyTileXY = emptyTileXYArray[i];
            board.createChess(emptyTileXY.x, emptyTileXY.y, 1, 0x808080);
        }
        // Find (closest) path tileXY array
        let tileXYArray = board.findPath(chessA, chessB);
        // Draw markers
        tileXYArray.forEach((tileXY) => {
            let marker = board.createChess(tileXY.x, tileXY.y, -1, 0x004000);
            SetAlpha(0.5, marker);

            let worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y, true);
            let text = new Text(worldXY.x, worldXY.y, tileXY.cost.toString());
            AddChild(world, text);
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
