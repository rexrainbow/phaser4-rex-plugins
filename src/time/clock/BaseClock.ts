import { Scene } from '@phaserjs/phaser/scenes/Scene';
import { BaseWorld } from '@phaserjs/phaser/world/BaseWorld';
import { GameObject } from '@phaserjs/phaser/gameobjects/GameObject';
import { On } from '@phaserjs/phaser/events';

import { TickTask } from '../../utils/ticktask/TickTask';
import { IConfig, IState } from './IClock';
import { TickingMode } from '../../utils/ticktask/ITickTask';

export class BaseClock extends TickTask {
    updater: Scene | BaseWorld = null;
    timeScale: number = 1;
    now: number = 0;

    constructor(
        parent: any,
        {
            updater = parent,
            isRunning = false,
            timeScale = 1,
            now = 0,
            tickingMode = TickingMode.lazy
        }: IConfig = {}
    ) {

        super(parent, arguments[1]);

        this.parent = parent;
        this.setUpdater(updater);

        this.isRunning = isRunning;
        this.timeScale = timeScale;
        this.now = now;
        this.setTickingMode(tickingMode);

        this.boot();
    }

    resetFromJSON({
        isRunning = false,
        timeScale = 1,
        now = 0,
        tickingMode = TickingMode.lazy
    }: IState = {}) {

        this.isRunning = isRunning;
        this.timeScale = timeScale;
        this.now = now;
        this.setTickingMode(tickingMode);
        return this;
    }

    toJSON(): IState {
        return {
            isRunning: this.isRunning,
            timeScale: this.timeScale,
            now: this.now,
            tickingMode: this.tickingMode
        };
    }

    boot() {
        super.boot();

        On(this.parent, 'destroy', this.destroy, this);
    }

    shutdown() {
        super.shutdown();
        this.parent = undefined;
        this.updater = undefined;
    }

    destroy() {
        this.shutdown();
    }

    setUpdater(
        updater?: Scene | BaseWorld | GameObject
    ): this {

        if (updater instanceof GameObject) {
            updater = updater.world;
        }
        if ((updater instanceof Scene) || (updater instanceof BaseWorld)) {
            this.updater = updater;
        } else {
            this.updater = null;
        }
        return this;
    }

    start(
        startAt: number = 0
    ): this {

        this.now = startAt;
        super.start();
        return this;
    }

    seek(
        time: number
    ): this {

        this.now = time;
        return this;
    }

    addDt(
        delta: number
    ): this {

        delta *= this.timeScale;
        this.now += delta;
        return this;
    }
}