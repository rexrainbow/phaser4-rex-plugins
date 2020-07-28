export function TableUpdateEvent(name) {
    return `tables.${name}.update`;
}

import { DataType } from '../../../../utils/struct/tree/ITree';
export type TableUpdateEventHandler = (data: DataType) => void;