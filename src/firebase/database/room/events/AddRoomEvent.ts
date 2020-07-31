export const AddRoomEvent = 'roomlist.add';

import { RoomFilterDataType } from '../IRoom';
export type AddRoomEventHandler = (room: RoomFilterDataType) => void;