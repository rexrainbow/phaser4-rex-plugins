import { BackgroundColor, Parent, Scenes, Size, WebGLRenderer } from '@phaserjs/phaser/config';
import { Game, Scene } from '@phaserjs/phaser';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { Sprite, SetTint, SetAlpha } from '@phaserjs/phaser/gameobjects/sprite';

import { Board, HexagonGrid, PathFinder } from '../../src/board';
import { CreatePolygonTexture } from '../../src/texture/canvastexture';

class MyBoard extends Board {
    world: StaticWorld;
    pathFinder: PathFinder;

    constructor(config) {
        super(config);

        this.pathFinder = new PathFinder({
            board: this
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

    findArea(
        chess,
        movingPoint: number
    ) {

        return this.pathFinder.findArea(chess, movingPoint);
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

            width: 16, height: 16
        })

        board
            .setWorld(world)
            .strokeGrid();
        let chess = board.createChess(8, 8, 1);
        let tileXYArray = board.findArea(chess, 4);
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
