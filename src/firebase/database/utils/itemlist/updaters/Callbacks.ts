import * as firebase from 'firebase/app';
import {
    IItemList,
    ItemType
} from '../IItemList';
import { UpdateItemID2Index, Clear } from '../ItemMethods';
import { SpliceOne } from '../../../../../utils/array/SpliceOne';

export let AddChildCallback = function (
    this: IItemList,
    snapshot: firebase.database.DataSnapshot,
    prevName: string
) {

    let item = AddItem.call(this, snapshot, prevName);
    UpdateItemID2Index(this);

    this.emit(this.eventNames.add, item);
    this.emit(this.eventNames.update, this.items);
}

export let ChangeChildCallback = function (
    this: IItemList,
    snapshot: firebase.database.DataSnapshot,
    prevName: string
) {

    let prevItem = RemoveItem.call(this, snapshot);
    UpdateItemID2Index(this);
    let newItem = AddItem.call(this, snapshot, prevName);
    UpdateItemID2Index(this);

    this.emit(this.eventNames.change, newItem, prevItem);
    this.emit(this.eventNames.update, this.items);
}

export let RemoveChildCallback = function (
    this: IItemList,
    snapshot: firebase.database.DataSnapshot
) {

    let item = RemoveItem.call(this, snapshot);
    UpdateItemID2Index(this);

    this.emit(this.eventNames.remove, item);
    this.emit(this.eventNames.update, this.items);
}

export let GetAllChildrenCallback = function (
    this: IItemList,
    snapshot: firebase.database.DataSnapshot
) {

    Clear(this);
    snapshot.forEach((function (childSnapshot:firebase.database.DataSnapshot) {
        AddItem.call(this, childSnapshot, null, true);
    }).bind(this));
    UpdateItemID2Index(this);

    this.emit(this.eventNames.update, this.items);
}

export let AddItem = function (
    this: IItemList,
    snapshot: firebase.database.DataSnapshot,
    prevName: string,
    pushMode: boolean = false
): ItemType {

    let item: ItemType;
    let callback = this.getItemCallback;
    let scope = this.getItemCallbackScope;
    if (scope) {
        item = callback.call(scope, snapshot);
    } else {
        item = callback(snapshot);
    }

    if (pushMode) {
        this.items.push(item);
        return item;
    }

    if (prevName == null) {
        this.items.unshift(item);
    } else {
        let i = this.itemID2Index.get(prevName);
        if (i === this.items.length - 1) {
            this.items.push(item);
        } else {
            this.items.splice(i + 1, 0, item);
        }
    }
    return item;
}

export let RemoveItem = function (
    this: IItemList,
    snapshot: firebase.database.DataSnapshot
): ItemType {

    let index = this.itemID2Index.get(snapshot.key);
    let item: ItemType = SpliceOne(this.items, index);
    return item;
}