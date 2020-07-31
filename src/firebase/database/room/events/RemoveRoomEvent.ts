export const RemoveRoomEvent = 'roomlist.remove';

import { RoomFilterDataType } from '../IRoom';
export type RemoveRoomEventHandler = (room: RoomFilterDataType) => void;