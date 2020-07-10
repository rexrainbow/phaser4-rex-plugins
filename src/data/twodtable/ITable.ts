export type RowType = { [colKey: string]: unknown };
export type JSONDataType = {
    [rowKey: string]: {
        [colKey: string]: unknown
    }
};
export type MapDataType = Map<string, any>;

export type KeyType = string[];
export type CursorType = {
    colKey: string,
    rowKey: string
};

export type CellValueCallbackType = (value?: unknown, rowKey?: string, colKey?: string, table?: ITable) => unknown
export type AppendCallbackType = (table: ITable, rowKey: string, colKey: string) => unknown;
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
    data?: JSONDataType;
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
    data: MapDataType;
    rowKeys: KeyType;
    colKeys: KeyType;
    cursor: CursorType;
}