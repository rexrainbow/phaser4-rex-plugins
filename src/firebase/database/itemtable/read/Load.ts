import { IItemTable } from '../IItemTable';

export let Load = function (
    itemTable: IItemTable
):Promise<any> {

    itemTable.updater.clear(); // Clear updater and table content

    itemTable.initialFlag = false;
    return itemTable.rootRef.once('value')
        .then(function (snapshot) {
            // Won't add any child to updater
            let value = snapshot.val() || {};
            itemTable.table.setValue(value); // Store table content
            itemTable.emit(itemTable.eventNames.init, value);
            itemTable.initialFlag = true;
            return Promise.resolve(value);
        })
}