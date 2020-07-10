import * as firebase from 'firebase/app';

export interface IBase {
    database: firebase.firestore.Firestore;
    rootPath: string;
    rootRef: firebase.firestore.CollectionReference;
}