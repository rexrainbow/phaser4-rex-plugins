import { IGameObject } from '@phaserjs/phaser/gameobjects/IGameObject';

export function GetChildByName(
    parent: IGameObject,
    name: string,
    recursive: Boolean = false
): IGameObject {

    if (!recursive) {
        for (let i = 0, cnt = parent.children.length; i < cnt; i++) {
            const child = parent.children[i];
            if (child.name === name) {
                return child;
            }
        }
    } else { // recursive
        // Breadth-first search
        const queue: IGameObject[] = [parent];
        while (queue.length) {
            parent = queue.shift();

            for (let i = 0, cnt = parent.children.length; i < cnt; i++) {
                const child = parent.children[i];
                if (child.name === name) {
                    return child;
                } else {
                    queue.push(child);
                }
            }
        }
    }
    return null;
}