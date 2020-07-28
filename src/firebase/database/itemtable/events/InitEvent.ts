export const InitEvent = 'init';

import { DataType } from '../../../../utils/struct/tree/ITree';
export type InitEventHandler = (data: DataType) => void;