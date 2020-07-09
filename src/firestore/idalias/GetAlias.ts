import * as firebase from 'firebase/app';
import {
    IIdAlias,
    IdAliasDataType
} from './IIdAlias';

export let GetAlias = function (
    idAlias: IIdAlias,
    id: string
): Promise<IdAliasDataType> {

    return idAlias.rootRef.where('id', '==', id).limit(1).get()
        .then(function (querySnapshot: firebase.firestore.QuerySnapshot): Promise<IdAliasDataType> {

            let alias: string;
            if (querySnapshot.size > 0) {
                alias = querySnapshot.docs[0].id;
            }
            return Promise.resolve({
                id: id,
                alias: alias
            });
        }
        );
}