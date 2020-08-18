import { VectorToCursorKeys } from '../../utils/input/VectorToCursorKeys';
import { ExtendEventEmitter } from '../../utils/eventemitter/ExtendEventEmitter';
import { IConfig } from './ITouchCursor'
import { Circle } from '@phaserjs/phaser/geom/circle/Circle';
import { Container } from '@phaserjs/phaser/gameobjects/container';
import { On, Off } from '@phaserjs/phaser/events'

export class TouchCursor extends ExtendEventEmitter(VectorToCursorKeys) {
    gameObject: Container;
    radius: number;

    constructor(
        gameObject: Container,
        {
            radius = 100,
            eventEmitter
        }: IConfig = {}
    ) {

        super(arguments[1]);

        // Event emitter
        this.setEventEmitter(eventEmitter);

        this.gameObject = gameObject;
        this.radius = radius;

        SetHitArea(gameObject, radius);
        this.boot();
    }

    addInput(pointer) {

    }

    boot() {
        On(this.gameObject, 'destroy', this.destroy, this);

        //this.gameObject.on('pointerdown', this.onKeyDownStart, this);
        //this.gameObject.on('pointerover', this.onKeyDownStart, this);
        //this.scene.input.on('pointermove', this.onKeyDown, this);
        //this.scene.input.on('pointerup', this.onKeyUp, this);
    }

    destroy() {
        this.destroyEventEmitter();
        this.gameObject = undefined;
    }

    onKeyDownStart(pointer) {
        // if ((!pointer.isDown) ||
        //     (this.pointer !== undefined)) {
        //     return;
        // }
        // this.pointer = pointer;
        this.onKeyDown(pointer);
    }

    onKeyDown(pointer) {
        // if (this.pointer !== pointer) {
        //     return;
        // }

        // Vector of world position
        this.setVector(
            (this.gameObject.x + pointer.camera.scrollX),
            (this.gameObject.y + pointer.camera.scrollY),
            pointer.worldX,
            pointer.worldY
        );
        this.emit('update');
    }

    onKeyUp(pointer) {
        // if (this.pointer !== pointer) {
        //     return;
        // }
        // this.pointer = undefined;
        this.clearVector();
        this.emit('update');
    }

}

function SetHitArea(
    gameObject: Container,
    radius: number
) {

    const input = gameObject.input;
    const transform = gameObject.transform;
    // TODO: Replaced by gameObject.displayOriginX, gameObject.displayOriginY
    const displayOriginX = transform.origin.x * transform.extent.width;
    const displayOriginY = transform.origin.y * transform.extent.height;

    input.enabled = true;
    input.hitArea = new Circle(displayOriginX, displayOriginY, radius);
}