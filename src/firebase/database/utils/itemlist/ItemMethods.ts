import {
    IItemList,
    ItemType
} from './IItemList';

export function Clear(
    itemList: IItemList
): void {

    itemList.items.length = 0;
    itemList.itemID2Index.clear();
};

export function GetItems(
    itemList: IItemList
): ItemType[] {

    return itemList.items;
};

export function HasItem(
    itemList: IItemList,
    itemID: string
): boolean {

    return itemList.itemID2Index.has(itemID);
}

export function GetItemIndexFromItemID(
    itemList: IItemList,
    itemID: string
): number {

    if (itemID == null) {
        return null;
    }

    return itemList.itemID2Index.get(itemID);
};

export function GetItemFromItemID(
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

export function ForEach(
    itemList: IItemList,
    callback: ((value: ItemType, index: number, array: ItemType[]) => void),
    scope?: unknown
): void {

    itemList.items.forEach(callback, scope);
};

export function UpdateItemID2Index(
    itemList: IItemList
): void {

    itemList.itemID2Index.clear();
    let items = itemList.items;
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        let itemID = items[i][itemList.keyItemID];
        itemList.itemID2Index.set(itemID, i);
    }
};