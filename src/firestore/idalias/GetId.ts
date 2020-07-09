import {
    IIdAlias,
    IdAliasDataType
} from './IIdAlias';
import { GetAliasRef } from './GetAliasRef';

export let GetId = function (
    idAlias: IIdAlias,
    alias: string
): Promise<IdAliasDataType> {

    return GetAliasRef(idAlias, alias).get()
        .then(function (doc: firebase.firestore.DocumentSnapshot): Promise<IdAliasDataType> {

            let id: string;
            if (doc.exists) {
                id = doc.data().id;
            }
            return Promise.resolve({
                id: id,
                alias: alias
            });
        });
}