import { IScene } from '@phaserjs/phaser/scenes/IScene';
import { Once, On, Off } from '@phaserjs/phaser/events';

import { TickTask } from '../../utils/ticktask/TickTask';
import { IConfig, TickCallbackType } from './ILoopInTicks';
import { LoopIndexGenerator } from '../loopindexgenerator/LoopIndexGenerator';
import { CurrentIndexesType, AddLoopConfig } from '../loopindexgenerator/ILoopIndexGenerator';
import { TickStartEvent, TickEndEvent } from './events';

const DeltaPeriod = 1000 / 60;

export class LoopInTicks extends TickTask {
    scene: IScene;
    deltaPercentage: number = 1;
    loopIndexGenerator = new LoopIndexGenerator();
    currentIndexes: CurrentIndexesType = {};
    callback: TickCallbackType;
    scope: unknown;

    constructor(
        scene: IScene,
        {
            callback,
            scope,
            deltaPercentage = 1
        }: IConfig = {}
    ) {

        super(scene, arguments[1]);

        this.scene = scene;
        this.setCallback(callback, scope);
        this.setDeltaPercentage(deltaPercentage);
        this.boot();
    }

    boot() {
        super.boot();
        Once(this.scene, 'shutdown', this.destroy, this);
    }

    shutdown() {
        super.shutdown();
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }

    startTicking() {
        super.startTicking();
        On(this.scene, 'update', this.preupdate, this);
    }

    stopTicking() {
        super.stopTicking();
        if (this.scene) { // Scene might be destoryed
            Off(this.scene, 'update', this.preupdate, this);
        }
    }

    setCallback(
        callback: TickCallbackType,
        scope?: unknown
    ): this {

        this.callback = callback;
        this.scope = scope;
        return this;
    }

    setDeltaPercentage(
        percentage: number
    ): this {

        this.deltaPercentage = percentage;
        return this;
    }

    addNumberLoop(
        key: string,
        start: number,
        end: number,
        step?: number
    ): this {

        this.loopIndexGenerator.addNumberLoop(key, start, end, step);
        return this;
    }

    addItemsLoop(
        key: string,
        items: any[],
        reverse: boolean = false
    ): this {

        this.loopIndexGenerator.addItemsLoop(key, items, reverse);
        return this;
    }

    addLoop(
        config: AddLoopConfig
    ): this {

        this.loopIndexGenerator.addLoop(config);
        return this;
    }

    get curTime(): number {
        return new Date().getTime();
    }

    get progress(): number {
        return this.loopIndexGenerator.progress;
    }

    preupdate() {
        if (!this.callback) {
            return;
        }

        const startTime = this.curTime;
        const totalTime = DeltaPeriod * this.deltaPercentage;
        let isTimeOut: boolean;

        this.emit(TickStartEvent);

        do {
            if (this.loopIndexGenerator.isEnd) {
                this.complete();
                return;
            }

            this.currentIndexes = this.loopIndexGenerator.getNext(this.currentIndexes);
            if (this.scope) {
                this.callback.call(this.scope, this.currentIndexes, this);
            } else {
                this.callback(this.currentIndexes, this);
            }
            isTimeOut = (this.curTime - startTime) >= totalTime;
        } while (!isTimeOut)

        this.emit(TickEndEvent);
    }
}