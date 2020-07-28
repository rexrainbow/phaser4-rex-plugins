export const AddEvent = 'add';

import { ItemType } from '../IItemList';
export type AddEventHandler = (item: ItemType) => void;