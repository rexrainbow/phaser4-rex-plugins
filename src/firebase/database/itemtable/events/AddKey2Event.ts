export const AddKey2Event = 'addkey2';

import { DataType } from '../../../../utils/struct/tree/ITree';
export type AddKey2EventHandler = (key0: string, key1: string, key2: string, data: DataType) => void;