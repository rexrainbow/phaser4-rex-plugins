import { IItemTable } from '../IItemTable';
import { IUpdater } from './updater/IUpdater';
import { TableType } from '../Types';
import { ColumnUpdater, RowUpdater, PageUpdater } from './updater';


const UpdaterClasses: { [mode: number]: any } = {};
UpdaterClasses[TableType['1d']] = ColumnUpdater;
UpdaterClasses[TableType['2d']] = RowUpdater;
UpdaterClasses[TableType['3d']] = PageUpdater;


export let CreateUpdater = function (
    itemTable: IItemTable
): IUpdater {

    return new (UpdaterClasses[itemTable.tableType])({
        type: itemTable.tableType,
        eventEmitter: itemTable.eventEmitter,
        eventNames: itemTable.eventNames,
        table: itemTable.table
    })
}
