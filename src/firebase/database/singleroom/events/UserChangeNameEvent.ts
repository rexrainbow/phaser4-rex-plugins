export const UserChangeNameEvent = 'userlist.changename';

export type UserChangeNameEventHandler = (userID: string, userName: string, prevUserName: string) => void;