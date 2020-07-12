import * as firebase from 'firebase/app';
import { IItemList, UpdaterType } from '../IItemList';
import { GetAllChildrenCallback } from './Callbacks';

export const Updater: UpdaterType = {
    start(
        itemList: IItemList,
        query: firebase.database.Query
    ) {

        query.on('value', GetAllChildrenCallback, itemList);
    },

    stop(itemList: IItemList) {

        itemList.query.off('value', GetAllChildrenCallback, itemList);
    }
}