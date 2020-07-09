import {
    IIdAlias,
    IdAliasDataType
} from './IIdAlias';
import { GetAlias } from './GetAlias';
import { AddAliasTransaction } from './AddAliasTransaction';


export let Add = function (
    idAlias: IIdAlias,
    id: string,
    alias: string
): Promise<IdAliasDataType> {

    return GetAlias(idAlias, id)
        .then(function (result: IdAliasDataType): Promise<IdAliasDataType> {

            if (result.alias) {
                if (result.alias === alias) {
                    return Promise.resolve({ id: id, alias: alias });
                } else {
                    return Promise.reject({ id: id, alias: alias });
                }
            } else {
                return AddAliasTransaction(idAlias, id, alias);
            }
        }
        );
}