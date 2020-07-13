import * as firebase from 'firebase/app';
import { IIdAlias } from './IIdAlias';


export function GetAliasRef(
    idAlias: IIdAlias,
    alias: string
): firebase.firestore.DocumentReference {

    return idAlias.rootRef.doc(alias);
}