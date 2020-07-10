import * as firebase from 'firebase/app';

export type UserInfoType = {
    userID: string
}

export interface IBaseData {
    userID?: string;
    fileID?: string;
    type?: 'header' | 'content';

    // Other properties
    [name: string]: any;
}

export interface IHeader extends IBaseData {
    headerDocID?: string;
    contentDocID?: string;
}

export interface IContent extends IBaseData {

}

// Load
export type LoadResultType = {
    userID: string,
    fileID: string,
    header: IHeader,
    content?: IContent
}

// LoadHeaders
export type LoadHeadersResultType = {
    userID: string,
    headers: Map<string, IHeader>
}

export interface IConfig {
    root?: string;
    userID?: string;
}

export interface IFile {
    database: firebase.firestore.Firestore;
    rootPath: string;
    rootRef: firebase.firestore.CollectionReference;

    userInfo: UserInfoType;
    userID: string;

    cacheHeaders: Map<string, IHeader>;

}