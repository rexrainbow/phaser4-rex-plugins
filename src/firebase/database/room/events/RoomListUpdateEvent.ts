export const RoomListUpdateEvent = 'roomlist.update';

import { RoomFilterDataType } from '../IRoom';
export type RoomListUpdateEventHandler = (rooms: RoomFilterDataType[]) => void;