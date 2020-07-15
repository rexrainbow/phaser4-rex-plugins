import {
    IRoom,
    ItemTableConfig, RoomInfoType
} from './IRoom';
import { ItemTable } from '../itemtable';
import { TableType } from '../itemtable/Types';
import { GetItemTablePath } from './GetRefMethods';

export function CreateTables(
    room: IRoom,
    tables: ItemTableConfig[] | false
): Map<string, ItemTable> {

    const tableInstances: Map<string, ItemTable> = new Map();
    if (!tables) {
        return tableInstances;
    }

    tables.forEach((tableConfig) => {
        tableInstances.set(tableConfig.key, CreateTable(room, tableConfig));
    })

    room
        .on('room.join', function (roomInfo: RoomInfoType) {

            for (const [key, tableInstance] of tableInstances) {
                tableInstance
                    .setRootPath(GetItemTablePath(room, roomInfo.roomID, key))
                    .startUpdate();
            }
        })
        .on('room.leave', function () {

            for (const [key, tableInstance] of tableInstances) {
                tableInstance
                    .stopUpdate()
                    .clear();
            }
        })

    return tableInstances;
}

function CreateTable(
    room: IRoom,
    {
        key,
        type = TableType['1d']
    }: ItemTableConfig
): ItemTable {

    const table = new ItemTable({
        eventEmitter: room.eventEmitter,

        type: type,
        eventNames: {
            init: `tables.${key}.init`,
            update: `tables.${key}.update`,
            addkey0: `tables.${key}.addkey0`,
            removekey0: `tables.${key}.removekey0`,
            changekey0: `tables.${key}.changekey0`,
            addkey1: `tables.${key}.addkey1`,
            removekey1: `tables.${key}.removekey1`,
            changekey1: `tables.${key}.changekey1`,
            addkey2: `tables.${key}.addkey2`,
            removekey2: `tables.${key}.removekey2`,
            changekey2: `tables.${key}.changekey2`
        }
    });

    return table;
}