import { IContainer } from '../IContainer';
import { IGameObject } from '@phaserjs/phaser/gameobjects/IGameObject';
import { AddChild } from '@phaserjs/phaser/display';
import { AddChildren } from '@phaserjs/phaser/display/AddChildren';

export function Add(
    container: IContainer,
    children: IGameObject | IGameObject[],
) {

    if (Array.isArray(children)) {
        AddChildren(container, ...children);
    } else {
        AddChild(container, children);
    }
}