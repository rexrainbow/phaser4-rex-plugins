export function TableChangeKey1Event(name) {
    return `tables.${name}.changekey1`;
}

import { DataType } from '../../../../utils/struct/tree/ITree';
export type TableChangeKey1EventHandler = (key0: string, key1: string, data: DataType) => void;