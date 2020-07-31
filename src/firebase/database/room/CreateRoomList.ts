import {
    IRoom,
    RoomFilterDataType
} from './IRoom';
import { ItemList } from '../utils/itemlist/ItemList';
import { AddRoomEvent, RemoveRoomEvent, RoomListUpdateEvent } from './events'

export function CreateRoomList(
    room: IRoom
): ItemList<RoomFilterDataType> {

    const roomListInstance = new ItemList<RoomFilterDataType>({
        eventEmitter: room.eventEmitter,
        itemIDKey: 'roomID',
        eventNames: {
            update: RoomListUpdateEvent,
            add: AddRoomEvent,
            remove: RemoveRoomEvent,
            change: 'roomlist.change'
        },
        mode: 'once'
    })

    return roomListInstance;
}