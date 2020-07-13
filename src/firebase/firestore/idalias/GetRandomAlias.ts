import {
    IIdAlias,
    IdAliasDataType
} from './IIdAlias';
import { GetAlias } from './GetAlias';
import { RetryAddRandomAliasTransaction } from './RetryAddRandomAliasTransaction';

export function GetRandomAlias(
    idAlias: IIdAlias,
    id: string,
    {
        digits = 10,
        candidates = '0123456789',
        retry = 1000
    } = {}
): Promise<IdAliasDataType | void> {

    return GetAlias(idAlias, id)
        .then(function (result: IdAliasDataType): Promise<IdAliasDataType | void> {

            if (result.alias) {
                return Promise.resolve(result);
            } else {
                return RetryAddRandomAliasTransaction(idAlias, id, digits, candidates, retry);
            }
        })
};