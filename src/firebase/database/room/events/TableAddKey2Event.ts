export function TableAddKey2Event(name: string) {
    return `tables.${name}.addkey2`;
}

import { DataType } from '../../../../utils/struct/tree/ITree';
export type TableAddKey2EventHandler = (key0: string, key1: string, key2: string, data: DataType) => void;