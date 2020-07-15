import {
    IRoom,
    IConfig, RoomFilterDataType
} from './IRoom';
import { ItemList } from '../utils/itemlist/ItemList';

export function CreateRoomList(
    room: IRoom,
    { }: IConfig = {}
): ItemList<RoomFilterDataType> {

    const roomListInstance = new ItemList<RoomFilterDataType>({
        eventEmitter: room.eventEmitter,
        itemIDKey: 'roomID',
        eventNames: {
            update: 'roomlist.update',
            add: 'roomlist.add',
            remove: 'roomlist.remove',
            change: 'roomlist.change'
        },
        mode: 'once'
    })

    return roomListInstance;
}