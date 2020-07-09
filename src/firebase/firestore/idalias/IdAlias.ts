import * as firebase from 'firebase/app';

import {
    IIdAlias,
    IConfig,
    IdAliasDataType
} from './IIdAlias';
import { Add } from './Add';
import { AddRandom } from './AddRandom';
import { GetAliasRef } from './GetAliasRef';
import { GetId } from './GetId';
import { GetAlias } from './GetAlias';
import { GetRandomAlias } from './GetRandomAlias';
import { Remove } from './Remove';

export class IdAlias implements IIdAlias {
    database: firebase.firestore.Firestore;
    rootPath: string;
    rootRef: firebase.firestore.CollectionReference;

    constructor({
        root = ''
    }: IConfig = {}) {

        this.database = firebase.firestore();
        this.setRootPath(root);
    }

    destroy() {
    }

    setRootPath(rootPath: string): this {

        this.rootPath = rootPath;
        this.rootRef = this.database.collection(rootPath);
        return this;
    }

    add(
        id: string,
        alias: string
    ): Promise<IdAliasDataType> {

        return Add(this, id, alias);
    }

    addRandom(
        id: string,
        config: {
            digits?: number,
            candidates?: string,
            retry?: number
        } = {}
    ): Promise<IdAliasDataType | void> {

        return AddRandom(this, id, config);
    }

    getAliasRef(
        alias: string
    ): firebase.firestore.DocumentReference {

        return GetAliasRef(this, alias);
    }

    getId(
        alias: string
    ): Promise<IdAliasDataType> {

        return GetId(this, alias);
    }

    getAlias(
        id: string
    ): Promise<IdAliasDataType> {

        return GetAlias(this, id);
    }

    getRandomAlias(
        id: string,
        config: {
            digits?: number,
            candidates?: string,
            retry?: number
        } = {}
    ): Promise<IdAliasDataType | void> {

        return GetRandomAlias(this, id, config);
    }

    remove(
        id: string
    ): Promise<void> {

        return Remove(this, id);
    }
}
