export function TableUpdateEvent(name: string) {
    return `tables.${name}.update`;
}

import { DataType } from '../../../../utils/struct/tree/ITree';
export type TableUpdateEventHandler = (data: DataType) => void;