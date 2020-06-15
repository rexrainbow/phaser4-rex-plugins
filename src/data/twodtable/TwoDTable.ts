import { ITable, DataType, KeyType, CursorType, IConfig, ILoadCSVConfig, CellValueCallbackType } from './ITable';
import { LoadCSV } from './LoadCSV';
import { ConvertCol, ConvertRow } from './Convert';
import { EachRow, EachCol, EachCallback } from './ForEach';
import { Get, HasRowKey, HasColKey, HasKey } from './Get';
import { Set, Add } from './Set';
import { AppendRow, AppendCol, AppendCallbackType } from './Append';
import { Clear, RemoveRow, RemoveCol } from './Remove';
import { SortCol, SortRow, SortMode, SortModeString, SortCallback } from './Sort';
import { NextColKey, PreviousColKey, NextRowKey, PreviousRowKey } from './NextKey';
import { IsValueInRow, IsValueInCol } from './Search';
import { SetCursor } from './Cursor';

export class TwoDTable implements ITable {
    data: DataType;
    rowKeys: KeyType;
    colKeys: KeyType;
    cursor: CursorType;

    constructor(config?: IConfig) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o?: IConfig) {

        let data: DataType,
            row: KeyType,
            col: KeyType,
            cursor: CursorType;
        ({
            data = {},
            row =[],
            col =[],
            cursor = { colKey: '', rowKey: '' }
        } = o || {})

        this.data = data;
        this.rowKeys = row;
        this.colKeys = col;
        this.cursor = cursor;
        return this;
    }

    toJSON() {
        return {
            data: this.data,
            row: this.rowKeys,
            col: this.colKeys,
            cursor: this.cursor
        };
    }

    shutdown() {

        this.destroy();
    }

    destroy() {

        this.clear();
    }

    loadCSV(
        csvString: string,
        config?: ILoadCSVConfig
    ): this {

        LoadCSV(this, csvString, config);
        this.setCursor();
        return this;
    }

    convertRow(
        rowKey: string,
        callback?: CellValueCallbackType,
        scope?: object
    ): this {

        ConvertRow(this, rowKey, callback, scope);
        return this;
    }

    convertCol(
        colKey: string,
        callback?: CellValueCallbackType,
        scope?: object
    ): this {

        ConvertCol(this, colKey, callback, scope);
        return this;
    }

    clear(): this {

        Clear(this);
        return this;
    };

    get(
        rowKey: string,
        colKey: string
    ): any {

        let value: any = Get(this, rowKey, colKey);
        this.setCursor(rowKey, colKey);
        return value;
    }

    set(colKey: string, rowKey: string, value: any): this {

        Set(this, colKey, rowKey, value);
        this.setCursor(rowKey, colKey);
        return this;
    }

    add(colKey: string, rowKey: string, value: any): this {

        Add(this, colKey, rowKey, value);
        this.setCursor(rowKey, colKey);
        return this;
    }

    hasRowKey(rowKey: string) {

        return HasRowKey(this, rowKey);
    }

    hasColKey(colKey: string) {

        return HasColKey(this, colKey);
    }

    hasKey(rowKey: string, colKey: string) {

        return HasKey(this, rowKey, colKey);
    }

    appendRow(
        rowKey: string,
        callback?: AppendCallbackType | any,
        scope?: object
    ): this {

        AppendRow(this, rowKey, callback, scope);
        return this;
    }

    appendCol(
        colKey: string,
        callback?: AppendCallbackType | any,
        scope?: object
    ): this {

        AppendCol(this, colKey, callback, scope);
        return this;
    }

    removeRol(rowKey: string): this {

        RemoveRow(this, rowKey);
        return this;
    }

    removeCol(colKey: string): this {

        RemoveCol(this, colKey);
        return this;
    }

    eachRow(callback: EachCallback, scope?: object) {

        EachRow(this, callback, scope);
        return this;
    }

    eachCol(callback: EachCallback, scope?: object) {

        EachCol(this, callback, scope);
        return this;
    }

    nextColKey(colKey?: string, step?: number, wrap?: boolean): string {

        return NextColKey(this, colKey, step, wrap);
    }

    nextRowKey(rowKey?: string, step?: number, wrap?: boolean): string {

        return NextRowKey(this, rowKey, step, wrap);
    }

    previousColKey(colKey?: string, step?: number, wrap?: boolean): string {

        return PreviousColKey(this, colKey, step, wrap);
    }

    previousRowKey(rowKey?: string, step?: number, wrap?: boolean): string {

        return PreviousRowKey(this, rowKey, step, wrap);
    }

    sortCol(
        callback: SortCallback | string,
        scope?: object | SortMode | SortModeString
    ): this {

        SortCol(this, callback, scope);
        return this;
    }

    sortRow(
        callback: SortCallback | string,
        scope?: object | SortMode | SortModeString
    ): this {

        SortRow(this, callback, scope);
        return this;
    }

    isValueInRoW(rowKey: string, value: any) {

        return IsValueInRow(this, rowKey, value);
    }

    isValueInCol(colKey: string, value: any) {

        return IsValueInCol(this, colKey, value)
    }

    get curColKey() {
        return this.cursor.colKey;
    }

    get curRowKey() {
        return this.cursor.rowKey;
    }

    setCursor(rowKey: string = '', colKey: string = ''): this {

        SetCursor(this, rowKey, colKey);
        return this;
    }

}