import { IWorld } from '@phaserjs/phaser/world/IWorld';
import { Once, On, Off } from '@phaserjs/phaser/events';

import { TickTask } from '../../utils/ticktask/TickTask';
import { IConfig, TickCallbackType } from './ILoopInTicks';
import { LoopIndexGenerator } from '../loopindexgenerator/LoopIndexGenerator.js';
import { CurrentIndexesType, AddLoopConfig } from '../loopindexgenerator/ILoopIndexGenerator';
import { TickStartEvent, TickEndEvent } from './events';

class LoopInTicks extends TickTask {
    world: IWorld;
    deltaPeriod: number = 1000 / 60; // TODO
    deltaPercentage: number = 1;
    loopIndexGenerator = new LoopIndexGenerator();
    currentIndexes: CurrentIndexesType = {};
    callback: TickCallbackType;
    scope: unknown;

    constructor(
        world: IWorld,
        {
            callback,
            scope,
            deltaPercentage = 1
        }: IConfig
    ) {

        super(world, arguments[1]);

        this.world = world;
        this.setCallback(callback, scope);
        this.setDeltaPercentage(deltaPercentage);
        this.boot();
    }

    boot() {
        super.boot();
        Once(this.world, 'shutdown', this.destroy, this); // TODO: Check world events
    }

    shutdown() {
        super.shutdown();
        this.world = undefined;
    }

    destroy() {
        this.shutdown();
    }

    startTicking() {
        super.startTicking();
        On(this.world, 'update', this.preupdate, this);  // TODO: Check world events
    }

    stopTicking() {
        super.stopTicking();
        if (this.world) { // World might be destoryed
            Off(this.world, 'update', this.preupdate, this);  // TODO: Check world events
        }
    }

    setCallback(
        callback: TickCallbackType,
        scope: unknown
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
        const totalTime = this.deltaPeriod * this.deltaPercentage;
        let isTimeOut: boolean;

        this.emit(TickStartEvent, this);

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

        this.emit(TickEndEvent, this);
    }
}

export default LoopInTicks;