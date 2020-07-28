export function TableChangeKey0Event(name) {
    return `tables.${name}.changekey0`;
}

import { DataType } from '../../../../utils/struct/tree/ITree';
export type TableChangeKey0EventHandler = (key0: string, data: DataType) => void;