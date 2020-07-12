import {
    IItemList,
    ItemType
} from './IItemList';

export let Clear = function (
    itemList: IItemList
): void {

    itemList.items.length = 0;
    itemList.itemID2Index.clear();
};

export let GetItems = function (
    itemList: IItemList
): ItemType[] {

    return itemList.items;
};

export let HasItem = function (
    itemList: IItemList,
    itemID: string
): boolean {

    return itemList.itemID2Index.has(itemID);
}

export let GetItemIndexFromItemID = function (
    itemList: IItemList,
    itemID: string
): number {

    if (itemID == null) {
        return null;
    }

    return itemList.itemID2Index.get(itemID);
};

export let GetItemFromItemID = function (
    itemList: IItemList,
    itemID: string
): ItemType {

    if (itemID == null) {
        return null;
    }
    let index = GetItemIndexFromItemID(itemList, itemID);
    if (index == null) {
        return null;
    }

    return itemList.items[index];
};

export let ForEach = function (
    itemList: IItemList,
    callback: ((value: ItemType, index: number, array: ItemType[]) => void),
    scope?: unknown
): void {

    itemList.items.forEach(callback, scope);
};

export let UpdateItemID2Index = function (
    itemList: IItemList
): void {

    itemList.itemID2Index.clear();
    let items = itemList.items;
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        let itemID = items[i][itemList.keyItemID];
        itemList.itemID2Index.set(itemID, i);
    }
};