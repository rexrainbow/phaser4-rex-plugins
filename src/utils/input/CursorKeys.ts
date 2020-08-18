import { UpKey, DownKey, LeftKey, RightKey } from '@phaserjs/phaser/input/keyboard/keys';
import { IKey } from '@phaserjs/phaser/input/keyboard/IKey';

export class CursorKeys {

    cursorKeys = {
        up: new UpKey(),
        down: new DownKey(),
        left: new LeftKey(),
        right: new RightKey()
    }
    noKeyDown = true;

    createCursorKeys() {
        return this.cursorKeys;
    }

    setKeyState(
        keyName: string,
        isDown: boolean
    ): this {

        this.noKeyDown = this.noKeyDown || isDown;
        const key: IKey = this.cursorKeys[keyName];
        if (key.isDown !== isDown) {
            fakeEvent.timeStamp = Date.now();
            if (isDown) {
                key.down(fakeEvent as KeyboardEvent);
            } else {
                key.up(fakeEvent as KeyboardEvent);
            }
        }

        return this;
    }

    clearAllKeysState() {
        this.noKeyDown = true;
        for (const keyName in this.cursorKeys) {
            this.setKeyState(keyName, false);
        }
        return this;
    }

    getKeyState(
        keyName: string
    ): IKey {

        return this.cursorKeys[keyName];
    }

    get upKeyDown(): boolean {
        return this.cursorKeys.up.isDown;
    }

    get downKeyDown(): boolean {
        return this.cursorKeys.down.isDown;
    }

    get leftKeyDown(): boolean {
        return this.cursorKeys.left.isDown;
    }

    get rightKeyDown(): boolean {
        return this.cursorKeys.right.isDown;
    }

    get anyKeyDown(): boolean {
        return !this.noKeyDown;
    }
}

const fakeEvent = {
    altKey: false,
    ctrlKey: false,
    shiftKey: false,
    timeStamp: 0,
    preventDefault: (function () { })
};