import { IBaseText } from './IBaseText';
import { PenManager } from './penmanger/PenManager';

export function ClonePenManager(
    baseText: IBaseText,
    penManager?: PenManager
): PenManager {

    return baseText.canvasText.clonePenManager(penManager);
}

export function GetPenManager(
    baseText: IBaseText,
    text?: string,
    penManager?: PenManager
): PenManager {

    return baseText.canvasText.getPenManager(text, penManager);
}