export function TableAddKey0Event(name) {
    return `tables.${name}.addkey0`;
}

import { DataType } from '../../../../utils/struct/tree/ITree';
export type TableAddKey0EventHandler = (key0: string, data: DataType) => void;