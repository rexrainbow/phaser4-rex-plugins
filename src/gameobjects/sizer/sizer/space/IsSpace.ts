import { IChild } from '../../util/IChild';
import { Space } from './Space';

export function IsSpace(
    gameObject: IChild
): boolean {

    return (gameObject instanceof Space);
}