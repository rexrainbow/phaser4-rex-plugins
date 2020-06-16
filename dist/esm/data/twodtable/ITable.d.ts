export declare type RowType = {
    [colKey: string]: any;
};
export declare type DataType = {
    [rowKey: string]: RowType;
};
export declare type KeyType = string[];
export declare type CursorType = {
    colKey: string;
    rowKey: string;
};
export declare type CellValueCallbackType = (value?: any, rowKey?: string, colKey?: string, table?: ITable) => any;
export declare type AppendCallbackType = (table: ITable, rowKey: string, colKey: string) => any;
export declare type EachKeyCallback = (key?: string, table?: ITable) => boolean;
export declare enum SortMode {
    ascending = 0,
    descending = 1,
    logical_ascending = 2,
    logical_descending = 3
}
export declare type SortModeString = 'ascending' | 'descending' | 'logical_ascending' | 'logical_descending';
export declare type SortCallback = (keyA: string, keyB: string) => number;
export interface IConfig {
    data?: DataType;
    row?: KeyType;
    col?: KeyType;
    cursor?: CursorType;
}
export interface ILoadCSVConfig {
    delimiter?: string;
    convert?: boolean;
    convertCallback?: CellValueCallbackType;
    convertScope?: object;
}
export interface ITable {
    data: DataType;
    rowKeys: KeyType;
    colKeys: KeyType;
    cursor: CursorType;
}
//# sourceMappingURL=ITable.d.ts.map