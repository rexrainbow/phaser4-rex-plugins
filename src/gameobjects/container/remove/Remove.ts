import { IContainer } from '../IContainer';
import { IGameObject } from '@phaserjs/phaser/gameobjects/IGameObject';
import { RemoveChild } from '@phaserjs/phaser/display/RemoveChild';
import { RemoveChildren } from '@phaserjs/phaser/display/RemoveChildren';

export function Remove(
    container: IContainer,
    children: IGameObject | IGameObject[],
    destroyChild: boolean = true
) {

    if (Array.isArray(children)) {
        RemoveChildren(container, ...children);
        for (let i = 0, cnt = children.length; i < cnt; i++) {
            children[i].destroy();
        }

    } else {
        const child = children;
        RemoveChild(container, child);
        if (destroyChild) {
            child.destroy();
        }
    }
}