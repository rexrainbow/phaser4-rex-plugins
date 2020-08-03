import { IsSceneObject } from './IsSceneObject';
import { IsGameObject } from './IsGameObject';

export function GetSceneObject(object: any): any {

    if (IsSceneObject(object)) { // Scene object
        return object;
    } else if (IsGameObject(object)) { // Game object
        return object.world.scene;
    }
}