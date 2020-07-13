import {
    IIdAlias,
    IdAliasDataType
} from './IIdAlias';
import { GetAlias } from './GetAlias';
import { GetAliasRef } from './GetAliasRef';

export function Remove(
    idAlias: IIdAlias,
    id: string
): Promise<void> {

    return GetAlias(idAlias, id)
        .then(function (result: IdAliasDataType): Promise<void> {

            return GetAliasRef(idAlias, result.alias).delete();
        }
        )
}