import { BaseText } from './BaseText';

export function IsCanvasTextGameObject(gameObject) {
    return (gameObject instanceof BaseText);
}