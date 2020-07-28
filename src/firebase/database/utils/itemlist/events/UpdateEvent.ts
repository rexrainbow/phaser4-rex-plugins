export const UpdateEvent = 'update';

import { ItemType } from '../IItemList';
export type UpdateEventHandler = (users: ItemType[]) => void;