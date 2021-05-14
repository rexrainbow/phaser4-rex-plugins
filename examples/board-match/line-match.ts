import { BackgroundColor, Parent, Scenes, Size, WebGL } from '@phaserjs/phaser/config';
import { Game } from '@phaserjs/phaser/Game';
import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { StaticWorld } from '@phaserjs/phaser/world';
import { AddChild } from '@phaserjs/phaser/display/';
import { Sprite, SetTint, SetAlpha } from '@phaserjs/phaser/gameobjects/sprite';
import { Text } from '@phaserjs/phaser/gameobjects/text'
import { Between as RandomInt } from '@phaserjs/phaser/math'

import { Board, HexagonGrid, CreateTileTexture, Match } from '../../src/board';

const Colors: number[] = [0xff0000, 0x00ff00, 0x0000ff, 0x800080, 0x808000, 0x008080];

class MyChess extends Sprite {
    __symbol: number;

    constructor() {
        super(0, 0, 'chess');
    }

    setSymbol(symbol: number): this {
        this.__symbol = symbol;
        SetTint(Colors[symbol], this);
        return this;
    }

    getSymbol(): number {
        return this.__symbol;
    }
}

class MyBoard extends Board {
    world: StaticWorld;
    match: Match;
    lastMatchedCount: number;

    constructor(config) {
        super(config);

        this.match = new Match({
            board: this
        });
        this.lastMatchedCount = 0;

        CreateTileTexture(this, 'tile', undefined, 'white', 2);
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

    fillChess(): this {

        this.forEachTileXY((tileXY) => {
            let chess = new MyChess();
            chess.setSymbol(RandomInt(0, Colors.length - 1));

            AddChild(this.world, chess);
            this.addChess(chess, tileXY.x, tileXY.y, 0);
        })
        return this;
    }

    refreshSymbols(): this {
        this.match.refreshSymbols((tileXY) => {
            var chess = this.tileXYZToChess(tileXY.x, tileXY.y, 0) as MyChess;
            return (chess === null) ? null : chess.getSymbol();
        });
        return this;
    }

    match3(): this {
        let matchedCount = 0;
        this.refreshSymbols();
        this.match.match(3, (result) => {
            let chessArray = this.tileXYArrayToChessArray(result.tileXY, 0);
            for (let i = 0, cnt = chessArray.length; i < cnt; i++) {
                SetAlpha(0.5, chessArray[i] as Sprite);
            }
            matchedCount++;
        });
        this.lastMatchedCount = matchedCount;
        return this;
    }
}

class Demo extends Scene {
    constructor() {
        super();

        const world = new StaticWorld(this);

        const board = new MyBoard({
            grid: (new HexagonGrid({
                x: 80, y: 80,
                cellWidth: 60, cellHeight: 68
            })),

            width: 8, height: 8
        })

        board
            .setWorld(world)
            .strokeGrid()
            .fillChess()
            .match3();

        const text = new Text(0, 580, `Match count= ${board.lastMatchedCount}`);
        text.setOrigin(0);
        AddChild(world, text);
    }
}

new Game(
    WebGL(),
    Size(800, 600),
    Parent('game'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
