import * as firebase from 'firebase/app';
import { IIdAlias } from './IIdAlias';


export let GetAliasRef = function (
    idAlias: IIdAlias,
    alias: string
): firebase.firestore.DocumentReference {

    return idAlias.rootRef.doc(alias);
}