import { IBase } from '../utils/IBase';

export type UserInfoType = {
    userID: string
}

export interface IBaseData {
    userID?: string;
    fileID?: string;
    type?: 'header' | 'content';

    // Other properties
    [name: string]: unknown;
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

export interface IFile extends IBase {

    userInfo: UserInfoType;
    userID: string;

    cacheHeaders: Map<string, IHeader>;

}