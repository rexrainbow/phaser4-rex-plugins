export function TableAddKey1Event(name) {
    return `tables.${name}.addkey1`;
}


import { DataType } from '../../../../utils/struct/tree/ITree';
export type TableAddKey1EventHandler = (key0: string, key1: string, data: DataType) => void;