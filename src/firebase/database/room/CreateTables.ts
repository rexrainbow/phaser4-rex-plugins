import {
    IRoom,
    ItemTableConfig, RoomInfoType
} from './IRoom';
import { ItemTable } from '../itemtable';
import { TableType } from '../itemtable/Types';
import { GetItemTablePath } from './GetRefMethods';
import {
    JoinRoomEvent, LeaveRoomEvent,
    TableInitEvent, TableUpdateEvent,
    TableAddKey0Event, TableAddKey1Event, TableAddKey2Event,
    TableRemoveKey0Event, TableRemoveKey1Event, TableRemoveKey2Event,
    TableChangeKey0Event, TableChangeKey1Event, TableChangeKey2Event
} from './events';

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
        .on(JoinRoomEvent, function (roomInfo: RoomInfoType) {

            for (const [key, tableInstance] of tableInstances) {
                tableInstance
                    .setRootPath(GetItemTablePath(room, roomInfo.roomID, key))
                    .startUpdate();
            }
        })
        .on(LeaveRoomEvent, function () {

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
            init: TableInitEvent(key),
            update: TableUpdateEvent(key),
            addkey0: TableAddKey0Event(key),
            removekey0: TableRemoveKey0Event(key),
            changekey0: TableChangeKey0Event(key),
            addkey1: TableAddKey1Event(key),
            removekey1: TableRemoveKey1Event(key),
            changekey1: TableChangeKey1Event(key),
            addkey2: TableAddKey2Event(key),
            removekey2: TableRemoveKey2Event(key),
            changekey2: TableChangeKey2Event(key)
        }
    });

    return table;
}