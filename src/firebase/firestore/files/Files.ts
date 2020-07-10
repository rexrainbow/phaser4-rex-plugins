import * as firebase from 'firebase/app';
import {
    IFile, IConfig,
    UserInfoType, IHeader, IContent,
    LoadResultType, LoadHeadersResultType
} from './IFile';
import { Save } from './Save';
import { Load } from './Load';
import { LoadHeaders } from './LoadHeaders';
import { Delete } from './Delete';
import { Clear } from './Clear';


export class Files implements IFile {
    database: firebase.firestore.Firestore;
    rootPath: string;
    rootRef: firebase.firestore.CollectionReference;

    userInfo: UserInfoType;

    cacheHeaders: Map<string, IHeader>;

    constructor({
        root = '',
        userID = ''
    }: IConfig = {}) {

        this.database = firebase.firestore();
        this.setRootPath(root);

        this.cacheHeaders = new Map();

        // Owner
        this.userInfo = { userID: '' };
        this.setOwner(userID);
    }

    destroy() {
    }

    get userID() {
        return this.userInfo.userID;
    }

    set userID(value) {
        this.userInfo.userID = value;
    }

    setRootPath(
        rootPath: string
    ): this {

        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
    }

    setOwner(
        userID: string | UserInfoType
    ): this {

        let prevUserID = this.userID;
        if (typeof (userID) === 'string') {
            this.userID = userID;
        } else {
            this.userInfo = userID;
        }

        if (prevUserID !== this.userID) {
            this.cacheHeaders.clear();
        }

        return this;
    }

    save(
        fileID: string,
        header: IHeader = {},
        content?: IContent,
        updateMode: boolean = false
    ): Promise<{ userID: string, fileID: string, error?: unknown }> {

        return Save(this, fileID, header, content, updateMode);
    }

    load(
        fileID: string
    ): Promise<LoadResultType> {

        return Load(this, fileID);
    }

    loadHeaders(
    ): Promise<LoadHeadersResultType> {

        return LoadHeaders(this);
    }

    delete(
        fileID: string
    ): Promise<{ userID: string, fileID: string, error?: unknown }> {

        return Delete(this, fileID);
    }

    Clear(
    ): Promise<{ userID: string, error?: unknown }> {

        return Clear(this);
    }
}