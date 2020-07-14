import * as firebase from 'firebase/app';
import { IItemTable } from './IItemTable';

export function GetItemRef(
    itemTable: IItemTable,
    key0?: string,
    key1?: string,
    key2?: string
): firebase.database.Reference {

    let ref = itemTable.rootRef;
    ref = (key0) ? ref.child(key0) : ref;
    ref = (key1) ? ref.child(key1) : ref;
    ref = (key2) ? ref.child(key2) : ref;
    return ref;
}