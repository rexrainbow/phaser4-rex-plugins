export const ChangeEvent = 'change';

import { ItemType } from '../IItemList';
export type ChangeEventHandler = (newItem: ItemType, prevItem: ItemType) => void;