export const ChangeNameEvent = 'changename';

export type ChangeNameEventHandler = (userID: string, userName: string, prevUserName: string) => void;