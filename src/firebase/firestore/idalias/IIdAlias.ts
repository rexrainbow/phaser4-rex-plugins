import * as firebase from 'firebase/app';

export type IdAliasDataType = { id: string, alias: string };

export interface IConfig {
    root?: string
}

export interface IIdAlias {
    database: firebase.firestore.Firestore;
    rootPath: string;
    rootRef: firebase.firestore.CollectionReference;
}