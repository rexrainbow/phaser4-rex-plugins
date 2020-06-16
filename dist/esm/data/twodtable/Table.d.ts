import { ITable, DataType, KeyType, CursorType, IConfig, ILoadCSVConfig, CellValueCallbackType, AppendCallbackType, EachKeyCallback, SortMode, SortModeString, SortCallback } from './ITable';
export declare class Table implements ITable {
    data: DataType;
    rowKeys: KeyType;
    colKeys: KeyType;
    cursor: CursorType;
    constructor(config?: IConfig);
    resetFromJSON(o?: IConfig): this;
    toJSON(): {
        data: DataType;
        row: KeyType;
        col: KeyType;
        cursor: CursorType;
    };
    shutdown(): void;
    destroy(): void;
    loadCSV(csvString: string, config?: ILoadCSVConfig): this;
    convertRow(rowKey: string, callback?: CellValueCallbackType, scope?: object): this;
    convertCol(colKey: string, callback?: CellValueCallbackType, scope?: object): this;
    clear(): this;
    get(rowKey?: string, colKey?: string): any;
    set(rowKey: string | any, colKey?: string, value?: any): this;
    add(rowKey?: string | any, colKey?: string, value?: number): this;
    hasRowKey(rowKey: string): boolean;
    hasColKey(colKey: string): boolean;
    hasKey(rowKey: string, colKey: string): boolean;
    appendRow(rowKey: string, callback?: AppendCallbackType | any, scope?: object): this;
    appendCol(colKey: string, callback?: AppendCallbackType | any, scope?: object): this;
    removeRol(rowKey: string): this;
    removeCol(colKey: string): this;
    eachRow(callback: EachKeyCallback, scope?: object): this;
    eachCol(callback: EachKeyCallback, scope?: object): this;
    nextRowKey(rowKey?: string, step?: number, wrap?: boolean): string | undefined;
    nextColKey(colKey?: string, step?: number, wrap?: boolean): string | undefined;
    previousRowKey(rowKey?: string, step?: number, wrap?: boolean): string | undefined;
    previousColKey(colKey?: string, step?: number, wrap?: boolean): string | undefined;
    sortRow(callback: SortCallback | string, scope?: object | SortMode | SortModeString): this;
    sortCol(callback: SortCallback | string, scope?: object | SortMode | SortModeString): this;
    isValueInRoW(rowKey: string, value: any): boolean;
    isValueInCol(colKey: string, value: any): boolean;
    get firstRowKey(): string;
    get firstColKey(): string;
    get curRowKey(): string;
    get curColKey(): string;
    setCursor(rowKey?: string, colKey?: string): this;
}
//# sourceMappingURL=Table.d.ts.map