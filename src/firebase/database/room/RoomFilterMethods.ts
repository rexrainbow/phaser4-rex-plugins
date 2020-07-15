export function GetRoomState(filterString: string): string {

    return filterString.split('|')[0];
}

export function GetRoomType(filterString: string): string {

    return filterString.split('|')[1];
}

export function GetFilterString(
    roomState: string,
    roomType: string = ''
): string {

    return `${roomState}|${roomType}`;
}