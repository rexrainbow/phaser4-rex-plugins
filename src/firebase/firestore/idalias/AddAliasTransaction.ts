import * as firebase from 'firebase/app';
import {
    IIdAlias,
    IdAliasDataType
} from './IIdAlias';
import { GetAliasRef } from './GetAliasRef';

export function AddAliasTransaction(
    idAlias: IIdAlias,
    id: string,
    alias: string
): Promise<IdAliasDataType> {

    return idAlias.database.runTransaction(function (transaction: firebase.firestore.Transaction): Promise<IdAliasDataType> {

        let aliasRef = GetAliasRef(idAlias, alias);
        return transaction.get(aliasRef)
            .then(
                function (
                    doc: firebase.firestore.DocumentSnapshot
                ): Promise<IdAliasDataType> {

                    if (!doc.exists) {
                        transaction.set(aliasRef, { id: id });
                        return Promise.resolve({ id: id, alias: alias });
                    } else {
                        return Promise.reject({ id: id, alias: alias });
                    }
                }
            )
    });
}