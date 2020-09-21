import { IContainer } from '../IContainer';

export function Clear(
    container: IContainer,
    destroyChild: boolean = true
) {
    const children = container.children;
    for (let i = 0, cnt = children.length; i < cnt; i++) {
        const child = children[i];
        child.parent = null;
        if (destroyChild) {
            child.destroy();
        }
    }
    children.length = 0;
}