export const UpdateEvent = 'update';

import { DataType } from '../../../../utils/struct/tree/ITree';
export type UpdateEventHandler = (data: DataType) => void;