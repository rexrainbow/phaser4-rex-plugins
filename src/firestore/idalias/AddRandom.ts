import {
    IIdAlias,
    IdAliasDataType
} from './IIdAlias';
import { GetAlias } from './GetAlias';
import { GetRandomWord } from '../../utils/string/GetRandomWord';
import { RetryAddRandomAliasTransaction } from './RetryAddRandomAliasTransaction';

export let AddRandom = function (
    idAlias: IIdAlias,
    id: string,
    {
        digits = 10,
        candidates = '0123456789',
        retry = 1000
    } = {}
): Promise<IdAliasDataType | void> {

    let self = this;
    return GetAlias(idAlias, id)
        .then(function (result: IdAliasDataType): Promise<IdAliasDataType | void> {

            if (result.alias) {
                let alias = GetRandomWord(digits, digits, candidates);
                if (result.alias === alias) {
                    return Promise.resolve({ id: id, alias: alias });
                } else {
                    return Promise.reject({ id: id, alias: alias });
                }
            } else {
                return RetryAddRandomAliasTransaction(idAlias, id, digits, candidates, retry);
            }
        });
}