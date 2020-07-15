import {
    IRoom,
    ICreateRoomConfig, ICreateRandomRoomCongfig
} from './IRoom';
import { GetRandomWord } from '../../../utils/string/GetRandomWord';
import { CreateRoom } from './CreateRoom';

export function CreateRandomRoom(
    room: IRoom,
    {
        digits = 10,
        candidates = '0123456789',
        retry = 1000
    }: ICreateRandomRoomCongfig) {

    let config: ICreateRoomConfig = arguments[1];
    return TryCreateRandomRoom(room, digits, candidates, retry, config);
}

function TryCreateRandomRoom(
    room: IRoom,
    digits: number,
    candidates: string,
    retry: number,
    config: ICreateRoomConfig
) {

    config.roomID = GetRandomWord(digits, digits, candidates);
    if (retry <= 0) {
        return Promise.reject(config);
    }
    retry--;
    return CreateRoom(room, config)
        .catch(function () {
            return TryCreateRandomRoom(room, digits, candidates, retry, config);
        })
}