import CSVParser from 'papaparse/papaparse.min.js';
import { SortCol, SortRow, SortMode, SortModeString, SortCallback } from './Sort';

import ArrayCopy from '../../utils/array/Copy.js';
import TypeConvert from '../../utils/string/TypeConvert';

const GetValue = Phaser.Utils.Objects.GetValue;

class CsvToHashTable {
    constructor(config) {
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.data = GetValue(o, 'data', {}); // 2d hash data
        this.rowKeys = GetValue(o, 'row', []);
        this.colKeys = GetValue(o, 'col', []);
        this.cursor = GetValue(o, 'cursor', {});
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

    shutdown() { }

    destroy() { }

    loadCSV(csvString, config) {
        var delimiter = GetValue(config, 'delimiter', ',');
        var convert = GetValue(config, 'convert', true);
        var convertScope = GetValue(config, 'convertScope', undefined);
        if (!convert) {
            convert = undefined;
            convertScope = undefined;
        } else if (convert === true) {
            convert = TypeConvert;
            convertScope = undefined;
        }

        this.clear();
        var arr = CSVParser.parse(csvString, {
            delimiter: delimiter
        }).data;

        this.colKeys = ArrayCopy(this.colKeys, arr[0]);
        this.rowKeys.length = arr.length - 1;
        for (var i = 0, len = this.rowKeys.length; i < len; i++) {
            this.rowKeys[i] = arr[i + 1][0]; // skip 1st row
        }

        var colKeys = this.colKeys,
            rowKeys = this.rowKeys;
        var data = this.data;
        var colKey, rowKey, row, value;

        for (var r = 0, rlen = rowKeys.length; r < rlen; r++) {
            rowKey = rowKeys[r];
            row = {};
            data[rowKey] = row;
            for (var c = 0, clen = colKeys.length; c < clen; c++) {
                value = arr[r + 1][c];
                colKey = colKeys[c];

                if (convert) {
                    if (convertScope) {
                        value = convert.call(convertScope, value, rowKey, colKey, this);
                    } else {
                        value = convert(value, rowKey, colKey, this);
                    }
                }
                row[colKey] = value;
            }
        }

        this.setCursor('', '');

        return this;
    }

    clear() {
        var data = this.data;
        for (var key in data) {
            delete data[key];
        }
        this.rowKeys.length = 0;
        this.colKeys.length = 0;
        return this;
    };

    get(rowKey, colKey) {
        var value = undefined;
        var data = this.data;
        if (data.hasOwnProperty(rowKey)) {
            var row = data[rowKey];
            if (row.hasOwnProperty(colKey)) {
                value = row[colKey];
            }
        }

        this.setCursor(rowKey, colKey);
        return value;
    }

    set(colKey, rowKey, value) {
        var data = this.data;
        if (data.hasOwnProperty(rowKey)) {
            var row = data[rowKey];
            if (row.hasOwnProperty(colKey)) {
                row[colKey] = value;
            }
        }

        this.setCursor(rowKey, colKey);
        return this;
    }

    add(colKey, rowKey, value) {
        var data = this.data;
        if (data.hasOwnProperty(rowKey)) {
            var row = data[rowKey];
            if (row.hasOwnProperty(colKey)) {
                row[colKey] += value;
            }
        }

        this.setCursor(rowKey, colKey);
        return this;
    }

    hasRowKey(rowKey) {
        return (this.rowKeys.indexOf(rowKey) !== -1);
    }

    hasColKey(colKey) {
        return (this.colKeys.indexOf(colKey) !== -1);
    }

    hasKey(rowKey, colKey) {
        return this.hasRowKey(rowKey) && this.hasColKey(colKey);
    }

    isValueInRol(rowKey, data) {
        if (!this.hasRowKey(rowKey)) {
            return false;
        }

        var row = this.data[rowKey];
        var colKey, colKeys = this.colKeys;
        for (var i = 0, len = colKeys.length; i < len; i++) {
            colKey = colKeys[i];
            if (row[colKey] === data) {
                return true;
            }
        }

        return false;
    }

    isValueInCol(colKey, data) {
        if (!this.hasColKey(colKey)) {
            return false;
        }
        var data = this.data,
            row;
        var rowKey, rowKeys = this.rowKeys
        for (var i = 0, len = rowKeys.length; i < len; i++) {
            if (data[rowKey][colKey] === data) {
                return true;
            }
        }

        return false;
    }

    appendRow(rowKey, callback, scope) {
        if (this.hasRowKey(rowKey)) {
            return this;
        }

        var isCallbackMode = (typeof (callback) === 'function');
        var initValue = (isCallbackMode) ? undefined : callback;

        this.rowKeys.push(rowKey);
        var row = {};
        this.data[rowKey] = row;
        var colKey, colKeys = this.colKeys,
            value;
        for (var i = 0, len = colKeys.length; i < len; i++) {
            colKey = colKeys[i];

            if (isCallbackMode) {
                if (scope) {
                    value = callback.call(scope, this, rowKey, colKey);
                } else {
                    value = callback(this, rowKey, colKey)
                }
            } else {
                value = initValue;
            }
            row[colKey] = value;
        }

        return this;
    }

    appendCol(colKey, callback, scope) {
        if (this.hasColKey(colKey)) {
            return this;
        }

        var isCallbackMode = (typeof (callback) === 'function');
        var initValue = (isCallbackMode) ? undefined : callback;

        this.colKeys.push(colKey);
        var data = this.data;
        var rowKey, rowKeys = this.rowKeys,
            value;
        for (var i = 0, len = rowKeys.length; i < len; i++) {
            rowKey = rowKeys[i];

            if (isCallbackMode) {
                if (scope) {
                    value = callback.call(scope, this, rowKey, colKey);
                } else {
                    value = callback(this, rowKey, colKey);
                }
            } else {
                value = initValue;
            }
            data[rowKey][colKey] = value;
        }

        return this;
    }

    removeRol(rowKey) {
        var idx = this.rowKeys.indexOf(rowKey);
        if (idx === -1) {
            return this;
        }
        this.rowKeys.splice(idx, 1);

        delete this.data[rowKey];
        return this;
    }

    removeCol(colKey) {
        var idx = this.colKeys.indexOf(colKey);
        if (idx === -1) {
            return this;
        }
        this.colKeys.splice(idx, 1);

        var data = this.data;
        var rowKeys = this.rowKeys;
        for (var i = 0, len = rowKeys.length; i < len; i++) {
            delete data[rowKeys[i]][colKey];
        }
        return this;
    }

    eachRow(colKey, callback, scope) {
        var rowKeys = this.rowKeys,
            rowKey, value;
        var isValidColKey = this.hasColKey(colKey);

        for (var i = 0, len = rowKeys.length; i < len; i++) {
            rowKey = rowKeys[i];
            if (isValidColKey) {
                value = this.get(rowKey, colKey);
            }

            if (scope) {
                callback.call(scope, this, rowKey, colKey, value);
            } else {
                callback(this, rowKey, colKey, value);
            }
        }
        return this;
    }

    eachCol(rowKey, callback, scope) {
        var colKeys = this.colKeys,
            colKey, value;
        var isValidRowKey = this.hasRowKey(rowKey);
        for (var i = 0, len = colKeys.length; i < len; i++) {
            colKey = colKeys[i];
            if (isValidRowKey) {
                value = this.get(rowKey, colKey);
            }

            if (scope) {
                callback.call(scope, this, rowKey, colKey, value);
            } else {
                callback(scope, this, rowKey, colKey, value);
            }
        }
        return this;
    }

    convertCol(colKey, callback, scope) {
        if (callback === undefined) {
            callback = TypeConvert;
        }

        if (Array.isArray(colKey)) {
            for (var i = 0, len = colKey.length; i < len; i++) {
                this.convertCol(colKey[i], callback, scope);
            }
            return this;
        }

        if (!this.hasColKey(colKey)) {
            return this;
        }

        var data = this.data,
            row;
        var rowKey, rowKeys = this.rowKeys,
            value;
        for (var r = 0, rlen = rowKeys.length; r < rlen; r++) {
            rowKey = rowKeys[r];
            row = data[rowKey];
            value = row[colKey];
            if (scope) {
                value = callback.call(scope, this, rowKey, colKey, value);
            } else {
                value = callback(this, rowKey, colKey, value);
            }

            row[colKey] = value;
        }
        return this;
    }

    convertRow(rowKey, callback, scope) {
        if (callback === undefined) {
            callback = TypeConvert;
        }

        if (Array.isArray(rowKey)) {
            for (var i = 0, len = rowKey.length; i < len; i++) {
                this.convertRow(rowKey[i], callback, scope);
            }
            return this;
        }

        var row = this.data[rowKey];
        var colKey, colKeys = this.colKeys,
            value;
        for (var c = 0, clen = colKeys.length; c < clen; c++) {
            colKey = colKeys[r];
            value = row[colKey];
            if (scope) {
                value = callback.call(scope, this, rowKey, colKey, value);
            } else {
                value = callback(this, rowKey, colKey, value);
            }

            row[colKey] = value;
        }
        return this;

    }

    get curColKey() {
        return this.cursor.colKey;
    }

    get curRowKey() {
        return this.cursor.rowKey;
    }

    nextColKey(colKey, step) {
        if (colKey === undefined) {
            colKey = this.cursor.colKey;
        }
        if (step === undefined) {
            step = 1;
        }

        var colKeys = this.colKeys;
        var idx = colKeys.indexOf(colKey);
        if (idx === -1) {
            return undefined;
        }
        return colKeys[idx + step];
    }

    nextRowKey(rowKey, step) {
        if (rowKey === undefined) {
            rowKey = this.cursor.rowKey;
        }
        if (step === undefined) {
            step = 1;
        }

        var rowKeys = this.rowKeys;
        var idx = rowKeys.indexOf(rowKey);
        if (idx === -1) {
            return undefined;
        }
        return rowKeys[idx + 1];
    }

    previousColKey(colKey, step) {
        if (step === undefined) {
            step = 1;
        }
        step = -step;
        return this.nextColKey(colKey, step);
    }

    previousRowKey(rowKey, step) {
        if (step === undefined) {
            step = 1;
        }
        step = -step;
        return this.nextRowlKey(rowKey, step);
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

    setCursor(rowKey, colKey) {
        var cursor = this.cursor;
        cursor.rowKey = rowKey;
        cursor.colKey = colKey;
        return this;
    }

}

const SORTMODE = {
    'ascending': 0,
    'descending': 1,
    'logical ascending': 2,
    'logical descending': 3
}
export default CsvToHashTable;