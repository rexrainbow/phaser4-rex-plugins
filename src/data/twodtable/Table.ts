import {
    ITable,
    DataType, KeyType, CursorType,
    IConfig, ILoadCSVConfig,
    CellValueCallbackType, AppendCallbackType, EachKeyCallback,
    SortMode, SortModeString, SortCallback
} from './ITable';
import { LoadCSV } from './LoadCSV';
import { ConvertCol, ConvertRow } from './Convert';
import { EachRow, EachCol } from './ForEach';
import { Get, HasRowKey, HasColKey, HasKey } from './Get';
import { Set, Add } from './Set';
import { AppendRow, AppendCol } from './Append';
import { Clear, RemoveRow, RemoveCol } from './Remove';
import { SortCol, SortRow } from './Sort';
import { NextColKey, PreviousColKey, NextRowKey, PreviousRowKey } from './NextKey';
import { IsValueInRow, IsValueInCol } from './Search';
import { SetCursor } from './Cursor';

/**
 * A 2-Dimations table indexed by (rowKey, columnKey).
 *
 * @export
 * @class Table
 * @implements {ITable}
 */
export class Table implements ITable {
    data: DataType;
    rowKeys: KeyType;
    colKeys: KeyType;
    cursor: CursorType;

    /**
     * Creates an instance of Table.
     * @param {IConfig} [config]
     * @memberof Table
     */
    constructor(config?: IConfig) {
        this.resetFromJSON(config);
    }

    /**
     * Reset state of this table.
     *
     * @param {IConfig} [o]
     * @returns
     * @memberof Table
     */
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

    /**
     * Get state of this table.
     *
     * @returns
     * @memberof Table
     */
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

    /**
     * Destroy this instance.
     *
     * @memberof Table
     */
    destroy() {

        this.clear();
    }

    /**
     * Load data from a csv-format string.
     *
     * @param {string} csvString
     * @param {ILoadCSVConfig} [config]
     * @returns {this}
     * @memberof Table
     */
    loadCSV(
        csvString: string,
        config?: ILoadCSVConfig
    ): this {

        LoadCSV(this, csvString, config);
        this.setCursor();
        return this;
    }

    /**
     * Convert string value to number/boolean/null value of a row.
     *
     * @param {string} rowKey
     * @param {CellValueCallbackType} [callback]
     * @param {object} [scope]
     * @returns {this}
     * @memberof Table
     */
    convertRow(
        rowKey: string,
        callback?: CellValueCallbackType,
        scope?: object
    ): this {

        ConvertRow(this, rowKey, callback, scope);
        return this;
    }

    /**
     * Convert string value to number/boolean/null value of a column.
     *
     * @param {string} colKey
     * @param {CellValueCallbackType} [callback]
     * @param {object} [scope]
     * @returns {this}
     * @memberof Table
     */
    convertCol(
        colKey: string,
        callback?: CellValueCallbackType,
        scope?: object
    ): this {

        ConvertCol(this, colKey, callback, scope);
        return this;
    }

    /**
     * Remove all cells in this table.
     *
     * @returns {this}
     * @memberof Table
     */
    clear(): this {

        Clear(this);
        return this;
    };

    /**
     * Get value in a cell.
     * This operation will change the cursor.
     *
     * @param {string} [rowKey=this.curRowKey]
     * @param {string} [colKey=this.curColKey]
     * @returns {*}
     * @memberof Table
     */
    get(
        rowKey: string = this.curRowKey,
        colKey: string = this.curColKey
    ): any {

        let value: any = Get(this, rowKey, colKey);
        this.setCursor(rowKey, colKey);
        return value;
    }

    /**
     * Set value of a cell. It has 2 parameter modes :  
     * 
     * - `table.set(rowKey, colKey, value)` : Set value to (rowKey, colKey) cell.
     * - `table.set(value)` : Set value to cursor cell.
     * 
     * This operation will change the cursor.
     *
     * @param {(string | any)} rowKey
     * @param {string} [colKey]
     * @param {*} [value]
     * @returns {this}
     * @memberof Table
     */
    set(
        rowKey: string | any,
        colKey?: string,
        value?: any
    ): this {

        if (arguments.length === 1) {
            value = rowKey;
            rowKey = this.curRowKey;
            colKey = this.curColKey;
        }

        Set(this, rowKey, colKey, value);
        this.setCursor(rowKey, colKey);
        return this;
    }

    /**
     * Add a number value to a cell. It has 4 parameter modes :  
     * 
     * - `table.add(rowKey, colKey, value)` : Add value to (rowKey, colKey) cell.
     * - `table.add(rowKey, colKey)` : Add 1 to (rowKey, colKey) cell.
     * - `table.add(value)` : Add value to cursor cell.
     * - `table.add()` : Add 1 to cursor cell.
     * 
     * This operation also change the cursor.
     *
     * @param {(string | any)} [rowKey]
     * @param {string} [colKey]
     * @param {number} [value]
     * @returns {this}
     * @memberof Table
     */
    add(
        rowKey?: string | any,
        colKey?: string,
        value?: number
    ): this {

        if (arguments.length <= 1) {
            value = (arguments.length === 0) ? 1 : rowKey;
            rowKey = this.curRowKey;
            colKey = this.curColKey;
        }

        Add(this, rowKey, colKey, value);
        this.setCursor(rowKey, colKey);
        return this;
    }

    /**
     * Dose table has this row-key?
     *
     * @param {string} rowKey
     * @returns
     * @memberof Table
     */
    hasRowKey(rowKey: string) {

        return HasRowKey(this, rowKey);
    }

    /**
     * Dose table has this column-key?
     *
     * @param {string} colKey
     * @returns
     * @memberof Table
     */
    hasColKey(colKey: string) {

        return HasColKey(this, colKey);
    }

    /**
     * Dose table has this row-key and column-key?
     *
     * @param {string} rowKey
     * @param {string} colKey
     * @returns
     * @memberof Table
     */
    hasKey(rowKey: string, colKey: string) {

        return HasKey(this, rowKey, colKey);
    }

    /**
     * Append a new row, filled by callback, or a constant value.
     *
     * @param {string} rowKey
     * @param {(AppendCallbackType | any)} [callback]
     * @param {object} [scope]
     * @returns {this}
     * @memberof Table
     */
    appendRow(
        rowKey: string,
        callback?: AppendCallbackType | any,
        scope?: object
    ): this {

        AppendRow(this, rowKey, callback, scope);
        return this;
    }

    /**
     * Append a new column, filled by callback, or a constant value.
     *
     * @param {string} colKey
     * @param {(AppendCallbackType | any)} [callback]
     * @param {object} [scope]
     * @returns {this}
     * @memberof Table
     */
    appendCol(
        colKey: string,
        callback?: AppendCallbackType | any,
        scope?: object
    ): this {

        AppendCol(this, colKey, callback, scope);
        return this;
    }

    /**
     * Remove a row.
     *
     * @param {string} rowKey
     * @returns {this}
     * @memberof Table
     */
    removeRol(rowKey: string): this {

        RemoveRow(this, rowKey);
        return this;
    }

    /**
     * Remove a column.
     *
     * @param {string} colKey
     * @returns {this}
     * @memberof Table
     */
    removeCol(colKey: string): this {

        RemoveCol(this, colKey);
        return this;
    }

    /**
     * Run callback for each row.
     *
     * @param {EachKeyCallback} callback
     * @param {object} [scope]
     * @returns
     * @memberof Table
     */
    eachRow(callback: EachKeyCallback, scope?: object) {

        EachRow(this, callback, scope);
        return this;
    }

    /**
     * Run callback for each column.
     *
     * @param {EachKeyCallback} callback
     * @param {object} [scope]
     * @returns
     * @memberof Table
     */
    eachCol(callback: EachKeyCallback, scope?: object) {

        EachCol(this, callback, scope);
        return this;
    }

    /**
     * Get next row key.
     * This operation also change the cursor.
     *
     * @param {string} [rowKey=this.curRowKey]
     * @param {number} [step]
     * @param {boolean} [wrap]
     * @returns {(string | undefined)}
     * @memberof Table
     */
    nextRowKey(
        rowKey: string = this.curRowKey,
        step?: number,
        wrap?: boolean
    ): string | undefined {

        let key = NextRowKey(this, rowKey, step, wrap);
        if (key) {
            this.cursor.rowKey = key;
        }
        return key;
    }

    /**
     * Get next column key.
     * This operation will change the cursor.
     *
     * @param {string} [colKey=this.curColKey]
     * @param {number} [step]
     * @param {boolean} [wrap]
     * @returns {(string | undefined)}
     * @memberof Table
     */
    nextColKey(
        colKey: string = this.curColKey,
        step?: number,
        wrap?: boolean
    ): string | undefined {

        let key = NextColKey(this, colKey, step, wrap);
        if (key) {
            this.cursor.colKey = key;
        }
        return key;
    }

    /**
     * Get previous row key.
     * This operation will change the cursor.
     *
     * @param {string} [rowKey=this.curRowKey]
     * @param {number} [step]
     * @param {boolean} [wrap]
     * @returns {(string | undefined)}
     * @memberof Table
     */
    previousRowKey(
        rowKey: string = this.curRowKey,
        step?: number,
        wrap?: boolean
    ): string | undefined {

        let key = PreviousRowKey(this, rowKey, step, wrap);
        if (key) {
            this.cursor.rowKey = key;
        }
        return key;
    }

    /**
     * Get previous column key.
     * This operation will change the cursor.
     *
     * @param {string} [colKey=this.curColKey]
     * @param {number} [step]
     * @param {boolean} [wrap]
     * @returns {(string | undefined)}
     * @memberof Table
     */
    previousColKey(
        colKey: string = this.curColKey,
        step?: number,
        wrap?: boolean
    ): string | undefined {

        let key = PreviousColKey(this, colKey, step, wrap);
        if (key) {
            this.cursor.colKey = key;
        }
        return key;
    }

    /**
     * Sort rows.
     *
     * @param {(SortCallback | string)} callback
     * @param {(object | SortMode | SortModeString)} [scope]
     * @returns {this}
     * @memberof Table
     */
    sortRow(
        callback: SortCallback | string,
        scope?: object | SortMode | SortModeString
    ): this {

        SortRow(this, callback, scope);
        return this;
    }

    /**
     * Sort columns.
     *
     * @param {(SortCallback | string)} callback
     * @param {(object | SortMode | SortModeString)} [scope]
     * @returns {this}
     * @memberof Table
     */
    sortCol(
        callback: SortCallback | string,
        scope?: object | SortMode | SortModeString
    ): this {

        SortCol(this, callback, scope);
        return this;
    }

    /**
     * Dose a row has a specific value?
     *
     * @param {string} rowKey
     * @param {*} value
     * @returns
     * @memberof Table
     */
    isValueInRoW(rowKey: string, value: any) {

        return IsValueInRow(this, rowKey, value);
    }

    /**
     * Dose a columns has a specific value?
     *
     * @param {string} colKey
     * @param {*} value
     * @returns
     * @memberof Table
     */
    isValueInCol(colKey: string, value: any) {

        return IsValueInCol(this, colKey, value)
    }

    /**
     * Get key of first row.
     *
     * @readonly
     * @memberof Table
     */
    get firstRowKey(): string {
        if (this.rowKeys.length === 0) {
            return '';
        } else {
            return this.rowKeys[0];
        }
    }

    /**
     * Get key of first column.
     *
     * @readonly
     * @memberof Table
     */
    get firstColKey(): string {
        if (this.colKeys.length === 0) {
            return '';
        } else {
            return this.colKeys[0];
        }
    }

    /**
     * Get row key of last access (get or set cell).
     *
     * @readonly
     * @memberof Table
     */
    get curRowKey(): string {
        return this.cursor.rowKey;
    }

    /**
     * Get column key of last access (get or set cell).
     *
     * @readonly
     * @memberof Table
     */
    get curColKey(): string {
        return this.cursor.colKey;
    }

    /**
     * Set cursor to (rowKey, colKey).
     *
     * @param {string} [rowKey=this.firstRowKey]
     * @param {string} [colKey=this.firstColKey]
     * @returns {this}
     * @memberof Table
     */
    setCursor(
        rowKey: string = this.firstRowKey,
        colKey: string = this.firstColKey
    ): this {

        SetCursor(this, rowKey, colKey);
        return this;
    }

}