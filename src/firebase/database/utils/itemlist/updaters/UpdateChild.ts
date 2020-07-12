import * as firebase from 'firebase/app';
import { IItemList, UpdaterType } from '../IItemList';
import { AddChildCallback, RemoveChildCallback, ChangeChildCallback } from './Callbacks';

export const Updater: UpdaterType = {
    start(
        itemList: IItemList,
        query: firebase.database.Query
    ) {

        query.on('child_added', AddChildCallback, itemList);
        query.on('child_removed', RemoveChildCallback, itemList);
        query.on('child_moved', ChangeChildCallback, itemList);
        query.on('child_changed', ChangeChildCallback, itemList);
    },

    stop(itemList: IItemList) {

        itemList.query.off('child_added', AddChildCallback, itemList);
        itemList.query.off('child_removed', RemoveChildCallback, itemList);
        itemList.query.off('child_moved', ChangeChildCallback, itemList);
        itemList.query.off('child_changed', ChangeChildCallback, itemList);
    },
}