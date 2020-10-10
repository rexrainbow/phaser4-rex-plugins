import { BaseClock } from './BaseClock';
import { On, Off } from '@phaserjs/phaser/events';

export class Clock extends BaseClock {
    startTicking() {

        // Try get updater from parent
        if (this.update === null) {
            this.setUpdater(this.parent);
        }
        // Can't start ticking if no updater
        if (this.update === null) {
            return;
        }

        super.startTicking();
        if (this.updater) {
            On(this.updater, 'update', this.update, this);
        }
    }

    stopTicking() {

        super.stopTicking();
        if (this.updater) {
            Off(this.updater, 'update', this.update, this);
        }
    }

    update(
        delta: number
    ): this {

        if ((!this.isRunning) || (this.timeScale === 0)) {
            return this;
        }

        this.addDt(delta);
        return this;
    }
}