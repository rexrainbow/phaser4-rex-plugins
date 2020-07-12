import * as firebase from 'firebase/app';
import { IItemList, UpdaterType } from '../IItemList';
import { GetAllChildrenCallback } from './Callbacks';

export const Updater: UpdaterType = {
    start(
        itemList: IItemList,
        query: firebase.database.Query
    ) {

        itemList.isUpdating = false;
        query.once('value', GetAllChildrenCallback, itemList);
    },

    stop(itemList: IItemList) {
        // Do nothing
    }
}