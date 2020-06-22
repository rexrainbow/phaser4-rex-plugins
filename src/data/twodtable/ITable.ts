export type RowType = { [colKey: string]: any };
export type DataType = {
    [rowKey: string]: RowType
};
export type KeyType = string[];
export type CursorType = {
    colKey: string,
    rowKey: string
};

export type CellValueCallbackType = (value?: any, rowKey?: string, colKey?: string, table?: ITable) => any
export type AppendCallbackType = (table: ITable, rowKey: string, colKey: string) => any;
export type EachKeyCallback = (key?: string, table?: ITable) => boolean;

export enum SortMode {
    ascending = 0,
    descending = 1,
    logical_ascending = 2,
    logical_descending = 3
}
export type SortModeString = 'ascending' | 'descending' | 'logical_ascending' | 'logical_descending';
export type SortCallback = (keyA: string, keyB: string) => number;

export interface IState {
    data?: DataType;
    row?: KeyType;
    col?: KeyType;
    cursor?: CursorType;
}

export interface ILoadCSVConfig {
    delimiter?: string,
    convert?: boolean,
    convertCallback?: CellValueCallbackType,
    convertScope?: object
}

export interface ITable {
    data: DataType;
    rowKeys: KeyType;
    colKeys: KeyType;
    cursor: CursorType;
}