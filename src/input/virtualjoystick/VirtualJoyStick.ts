import { TouchCursor } from '../touchcursor/TouchCursor';
import { BaseEventEmitter } from '../../utils/eventemitter/BaseEventEmitter';
import { IConfig } from './IVirtualJoyStick';
import { IConfig as ITouchCursorConfig } from '../touchcursor/ITouchCursor';
import { Container } from '@phaserjs/phaser/gameobjects/container';

export class VirtualJoyStick extends BaseEventEmitter {
    radius: number;
    touchCursor: TouchCursor;
    base: Container;
    thumb: Container;


    constructor({
        eventEmitter,
        radius = 100,
        base,
        thumb,
        x = 0,
        y = 0,
        fixed = true
    }: IConfig = {}
    ) {

        super();

        // Event emitter
        this.setEventEmitter(eventEmitter);
        this.setRadius(radius);

        const config: IConfig = arguments[0];
        config.eventEmitter = this.getEventEmitter();
        this.addBase(base, config);
        this.addThumb(thumb);
        this.setPosition(x, y);

        if (fixed) {
            this.setScrollFactor(0);
        }

        this.boot();
    }

    destroy() {
        this.destroyEventEmitter();

        this.base.destroy(); // Also destroy touchCursor behavior
        this.thumb?.destroy();

        this.base = undefined;
        this.thumb = undefined;
        this.touchCursor = undefined;
    }

    createCursorKeys() {
        return this.touchCursor.createCursorKeys();
    }

    get forceX(): number {
        return this.touchCursor.forceX;
    }

    get forceY(): number {
        return this.touchCursor.forceY;
    }

    get force(): number {
        return this.touchCursor.force;
    }

    get rotation(): number {
        return this.touchCursor.rotation;
    }

    get angle(): number {
        return this.touchCursor.angle; // -180 ~ 180
    }

    get up(): boolean {
        return this.touchCursor.upKeyDown;
    }

    get down(): boolean {
        return this.touchCursor.downKeyDown;
    }

    get left(): boolean {
        return this.touchCursor.leftKeyDown;
    }

    get right(): boolean {
        return this.touchCursor.rightKeyDown;
    }

    get noKey(): boolean {
        return this.touchCursor.noKeyDown;
    }

    get pointerX(): number {
        return this.touchCursor.x1;
    }

    get pointerY(): number {
        return this.touchCursor.y1;
    }

    // get pointer() {
    //     return this.touchCursor.pointer;
    // }

    setPosition(
        x: number,
        y: number
    ): this {

        this.x = x;
        this.y = y;
        return this;
    }

    set x(x) {
        this.base.x = x;
        this.thumb.x = x;
    }

    set y(y) {
        this.base.y = y;
        this.thumb.y = y;
    }

    get x() {
        return this.base.x;
    }

    get y() {
        return this.base.y;
    }

    setVisible(
        visible: boolean
    ): this {

        this.visible = visible;
        return this;
    }

    toggleVisible(): this {

        this.visible = !this.visible;
        return this;
    }

    get visible(): boolean {
        return this.base.visible;
    }

    set visible(value) {
        this.base.visible = value;
        this.thumb.visible = value;
    }

    get enable(): boolean {
        return this.touchCursor.enable;
    }

    set enable(value: boolean) {

        this.touchCursor.setEnable(value);
    }

    setEnable(
        enable: boolean = true
    ): this {

        this.enable = enable;
        return this;
    }

    toggleEnable(): this {

        this.setEnable(!this.enable);
        return this;
    }

    setRadius(
        radius: number
    ): this {

        this.radius = radius;
        return this;
    }

    addBase(
        gameObject: Container,
        config?: ITouchCursorConfig
    ): this {

        if (this.base) {
            this.base.destroy();
            // Also destroy touchCursor behavior
        }

        this.touchCursor = new TouchCursor(gameObject, config)
        this.base = gameObject;
        return this;
    }

    addThumb(
        gameObject: Container
    ): this {

        if (this.thumb) {
            this.thumb.destroy();
        }
        this.thumb = gameObject;
        return this;
    }

    setScrollFactor(
        scrollFactor: number
    ): this {

        // this.base.setScrollFactor(scrollFactor);
        // this.thumb.setScrollFactor(scrollFactor);
        return this;
    }

    boot() {
        this.on('update', this.update, this);
    }

    update() {
        const touchCursor = this.touchCursor;
        // Start from (0,0)
        let x = this.base.x;
        let y = this.base.y;
        if (touchCursor.anyKeyDown) {
            if (touchCursor.force > this.radius) { // Exceed radius
                const rad = touchCursor.rotation;
                x += Math.cos(rad) * this.radius;
                y += Math.sin(rad) * this.radius;
            } else {
                x += touchCursor.forceX;
                y += touchCursor.forceY;
            }
        }
        this.thumb.x = x;
        this.thumb.y = y
        return this;
    }

}