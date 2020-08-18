import { CursorKeys } from './CursorKeys';
import { DirMode, DirModeString } from '../math/angle/angletodirections/types';
import { AngleToDirections } from '../math/angle/angletodirections/AngleToDirections';
import { DistanceBetween } from '@phaserjs/phaser/math/distance/DistanceBetween'
import { AngleBetween } from '@phaserjs/phaser/math/angle/AngleBetween';
import { RadToDeg } from '@phaserjs/phaser/math/RadToDeg';

export interface IConfig {
    enable?: boolean;
    dir?: DirMode | DirModeString;
    forceMin?: number;
}

export class VectorToCursorKeys extends CursorKeys {
    _enable: boolean;
    dirMode: DirMode;
    forceMin: number;
    x0: number;
    y0: number;
    x1: number;
    y1: number;

    constructor({
        enable = true,
        dir = DirMode['8dir'],
        forceMin = 16,
    }: IConfig = {}) {
        super();

        this.setEnable(enable);
        this.setMode(dir);
        this.setDistanceThreshold(forceMin);
        this.clearVector();
    }

    setMode(
        mode: DirMode | DirModeString
    ): this {

        if (typeof (mode) === 'string') {
            mode = DirMode[mode];
        }

        this.dirMode = mode;
        return this;
    }

    get enable() {
        return this._enable;
    }

    set enable(e) {
        if (this._enable === e) {
            return;
        }
        if (!e) {
            this.clearVector();
        }
        this._enable = e;
    }

    setEnable(
        enabled: boolean = true
    ): this {

        this.enable = enabled;
        return this;
    }

    toggleEnable(): this {

        this.setEnable(!this.enable);
        return this;
    }

    setDistanceThreshold(
        d: number
    ): this {

        if (d < 0) {
            d = 0;
        }

        this.forceMin = d;

        return this;
    }

    clearVector(): this {

        this.x0 = 0;
        this.y0 = 0;
        this.x1 = 0;
        this.y1 = 0;
        this.clearAllKeysState();

        return this;
    }

    setVector(
        x0: number,
        y0: number,
        x1?: number,
        y1?: number
    ): this {

        this.clearVector();

        if (!this.enable) {
            return this;
        }
        if (x0 === null) {
            return this;
        }

        if (x1 === undefined) {
            x1 = x0;
            x0 = 0;
            y1 = y0;
            y0 = 0;
        }

        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        if ((this.forceMin > 0) && (this.force < this.forceMin)) {
            return this;
        }

        const dirStates = AngleToDirections(this.angle, this.dirMode, true);
        for (const dir in dirStates) {
            if (dirStates[dir]) {
                this.setKeyState(dir, true);
            }
        }

        return this;
    }

    get forceX() {
        return this.x1 - this.x0;
    }

    get forceY() {
        return this.y1 - this.y0;
    }

    get force() {
        return DistanceBetween(this.x0, this.y0, this.x1, this.y1);
    }

    get rotation() {
        return AngleBetween(this.x0, this.y0, this.x1, this.y1);
    }

    get angle() {
        return RadToDeg(this.rotation); // -180 ~ 180
    }

    get octant() {
        let octant = 0;
        if (this.rightKeyDown) {
            octant = (this.downKeyDown) ? 45 : 0;
        } else if (this.downKeyDown) {
            octant = (this.leftKeyDown) ? 135 : 90;
        } else if (this.leftKeyDown) {
            octant = (this.upKeyDown) ? 225 : 180;
        } else if (this.upKeyDown) {
            octant = (this.rightKeyDown) ? 315 : 270;
        }
        return octant;
    }
}