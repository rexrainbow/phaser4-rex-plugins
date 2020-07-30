export function TableInitEvent(name: string) {
    return `tables.${name}.init`;
}

import { DataType } from '../../../../utils/struct/tree/ITree';
export type TableInitEventHandler = (data: DataType) => void;