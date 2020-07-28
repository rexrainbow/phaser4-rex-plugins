export const RemoveEvent = 'remove';

import { ItemType } from '../IItemList';
export type RemoveEventHandler = (item: ItemType) => void;