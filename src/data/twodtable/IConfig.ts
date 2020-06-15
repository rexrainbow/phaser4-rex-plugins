import { ITable, DataType, KeyType, CursorType } from './ITable';

export type CellCallbackType = (value?: any, rowKey?: string, colKey?: string, table?: ITable) => any

export interface IConfig {
    data?: DataType;
    row?: KeyType;
    col?: KeyType;
    cursor?: CursorType;
}

export interface ILoadCSVConfig {
    delimiter?: string,
    convert?: boolean,
    convertCallback?: CellCallbackType,
    convertScope?: object
}