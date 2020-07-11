import * as firebase from 'firebase/app';

export interface IBase {
    database: firebase.database.Database;
    rootPath: string;
    rootRef: firebase.database.Reference;
}