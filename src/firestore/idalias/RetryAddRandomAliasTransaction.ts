import {
    IIdAlias,
    IdAliasDataType
} from './IIdAlias';
import { GetRandomWord } from '../../utils/string/GetRandomWord';
import { AddAliasTransaction } from './AddAliasTransaction';

export let RetryAddRandomAliasTransaction = function (
    idAlias: IIdAlias,
    id: string,
    digits: number,
    candidates: string,
    retry: number
): Promise<IdAliasDataType | void> {

    let alias = GetRandomWord(digits, digits, candidates);
    if (retry <= 0) {
        return Promise.reject({ id: id, alias: alias });
    }

    retry--;
    return AddAliasTransaction(idAlias, id, alias)
        .catch(function () {
            setTimeout(function () {
                return RetryAddRandomAliasTransaction(idAlias, id, digits, candidates, retry);
            }, 0);
        });
}