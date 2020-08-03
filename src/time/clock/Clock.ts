import { IScene } from '@phaserjs/phaser/scenes/IScene';
import { On, Off } from '@phaserjs/phaser/events';

import { TickTask } from '../../utils/ticktask/TickTask';
import { IConfig, IState } from './IClock';
import { TickingMode } from '../../utils/ticktask/ITickTask';
import { GetSceneObject } from '../../utils/system/GetSceneObject';
import { GetEventEmitter } from '../../utils/system/GetEventEmitter';

export class Clock extends TickTask {
    scene: IScene;
    timeScale: number = 1;
    now: number = 0;

    constructor(
        parent: any,
        {
            isRunning = false,
            timeScale = 1,
            now = 0,
            tickingMode = TickingMode.lazy
        }: IConfig = {}
    ) {

        super(parent, arguments[1]);

        this.parent = parent;
        this.scene = GetSceneObject(parent);

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

        On(GetEventEmitter(this.parent), 'destroy', this.destroy, this);
    }

    shutdown() {
        super.shutdown();
        this.parent = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }

    startTicking() {

        super.startTicking();
        On(this.scene, 'update', this.update, this);
    }

    stopTicking() {

        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            Off(this.scene, 'update', this.update, this);
        }
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

    update(
        delta: number
    ): this {

        if ((!this.isRunning) || (this.timeScale === 0)) {
            return this;
        }

        this.now += (delta * this.timeScale);
        return this;
    }
}