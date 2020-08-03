import { Clock } from '../clock';
import { IConfig, IState } from './ILifeTime';
import { DieEvent } from './events'

export class LifeTime extends Clock {
    lifeTime: number;
    destroyMode: boolean;

    constructor(
        parent: any,
        {
            lifeTime = 1000,
            destroy = true
        }: IConfig = {}
    ) {

        super(parent, arguments[1]);

        this.setLifeTime(lifeTime);
        this.setDestroyMode(destroy);
    }

    resetFromJSON({
        lifeTime = 1000,
        destroy = true
    }: IState = {}) {

        super.resetFromJSON(arguments[0]);
        this.setLifeTime(lifeTime);
        this.setDestroyMode(destroy);
        return this;
    }

    toJSON(): IState {

        const o = super.toJSON() as IState;
        o.lifeTime = this.lifeTime;
        o.destroy = this.destroyMode;
        return o;
    }

    setLifeTime(
        time: number
    ): this {

        this.lifeTime = time;
        return this;
    }

    addToLifeTime(
        time: number
    ): this {

        this.lifeTime += time;
        return this;
    }

    setDestroyMode(
        enable: boolean = true
    ): this {

        this.destroyMode = enable;
        return this;
    }

    get isAlive(): boolean {

        return this.now < this.lifeTime;
    }

    get remainder(): number {

        let remainder = this.lifeTime - this.now;
        if (remainder < 0) {
            remainder = 0;
        }
        return remainder;
    }

    update(delta: number): this {

        if (!this.isRunning) {
            return this;
        }

        super.update(delta);
        if (!this.isAlive) {
            this.complete(DieEvent);
            if (this.destroyMode && this.gameObject.destroy) {
                this.gameObject.destroy();
            }
        }
        return this;
    }

    get gameObject() {
        return this.parent;
    }
}