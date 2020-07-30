export function TableChangeKey2Event(name: string) {
    return `tables.${name}.changekey2`;
}

import { DataType } from '../../../../utils/struct/tree/ITree';
export type TableChangeKey2EventHandler = (key0: string, key1: string, key2: string, data: DataType) => void;