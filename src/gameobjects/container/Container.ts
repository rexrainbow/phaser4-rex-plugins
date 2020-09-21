import { Container as BaseContainer } from '@phaserjs/phaser/gameobjects';
import { IContainer } from './IContainer';
import { IGameObject } from '@phaserjs/phaser/gameobjects/IGameObject';
import { Remove } from './remove/Remove';
import { Clear } from './remove/Clear';

export class Container extends BaseContainer implements IContainer {

    remove(
        children: IGameObject | IGameObject[],
        destroyChild: boolean = true
    ): this {

        Remove(this, children, destroyChild);
        return this;
    }

    clear(
        destroyChild: boolean = true
    ): this {

        Clear(this, destroyChild);
        return this;
    }
}