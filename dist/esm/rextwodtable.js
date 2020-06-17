import './_commonjsHelpers-ecffabcd.js';
import { p as papaparse_min } from './papaparse.min-494779ee.js';
import { C as Convert } from './TypeConvert-f203b481.js';

function Clear(table) {
    let data = table.data;
    for (let key in data) {
        delete data[key];
    }
    table.rowKeys.length = 0;
    table.colKeys.length = 0;
}
function RemoveRow(table, rowKey) {
    let idx = table.rowKeys.indexOf(rowKey);
    if (idx === -1) {
        return;
    }
    table.rowKeys.splice(idx, 1);
    delete table.data[rowKey];
}
function RemoveCol(table, colKey) {
    let idx = table.colKeys.indexOf(colKey);
    if (idx === -1) {
        return;
    }
    table.colKeys.splice(idx, 1);
    let data = table.data;
    let rowKeys = table.rowKeys;
    for (let i = 0, cnt = rowKeys.length; i < cnt; i++) {
        delete data[rowKeys[i]][colKey];
    }
}

function Copy(dest, src, startIdx = 0, endIdx = src.length) {
    dest.length = endIdx - startIdx;
    for (let i = 0, cnt = dest.length; i < cnt; i++) {
        dest[i] = src[i + startIdx];
    }
    return dest;
}

function LoadCSV(table, csvString, config) {
    let delimiter, convert, convertCallback, convertScope;
    ({
        delimiter = ',',
        convert = true,
        convertCallback = Convert,
        convertScope = undefined
    } = config || {});
    if (!convert) {
        convertCallback = undefined;
    }
    Clear(table);
    let arr = papaparse_min.parse(csvString, {
        delimiter: delimiter
    }).data;
    table.colKeys = Copy(table.colKeys, arr[0]);
    table.rowKeys.length = arr.length - 1;
    for (let i = 0, cnt = table.rowKeys.length; i < cnt; i++) {
        table.rowKeys[i] = arr[i + 1][0];
    }
    let colKeys = table.colKeys, rowKeys = table.rowKeys;
    let data = table.data;
    let colKey, rowKey, row, value;
    for (let r = 0, rcnt = rowKeys.length; r < rcnt; r++) {
        rowKey = rowKeys[r];
        row = {};
        data[rowKey] = row;
        for (let c = 0, ccnt = colKeys.length; c < ccnt; c++) {
            value = arr[r + 1][c];
            colKey = colKeys[c];
            if (convertCallback) {
                if (convertScope) {
                    value = convertCallback.call(convertScope, value, rowKey, colKey, table);
                }
                else {
                    value = convertCallback(value, rowKey, colKey, table);
                }
            }
            row[colKey] = value;
        }
    }
}

function Get(table, rowKey, colKey) {
    let value = undefined;
    let data = table.data;
    if (data.hasOwnProperty(rowKey)) {
        let row = data[rowKey];
        if (row.hasOwnProperty(colKey)) {
            value = row[colKey];
        }
    }
    return value;
}
function HasRowKey(table, rowKey) {
    return (table.rowKeys.indexOf(rowKey) !== -1);
}
function HasColKey(table, colKey) {
    return (table.colKeys.indexOf(colKey) !== -1);
}
function HasKey(table, rowKey, colKey) {
    return HasRowKey(table, rowKey) && HasColKey(table, colKey);
}

function ConvertRow(table, rowKey, callback = Convert, scope) {
    if (Array.isArray(rowKey)) {
        for (let i = 0, cnt = rowKey.length; i < cnt; i++) {
            ConvertRow(table, rowKey[i], callback, scope);
        }
        return;
    }
    if (!HasRowKey(table, rowKey)) {
        return;
    }
    let row = table.data[rowKey];
    let colKeys = table.colKeys, colKey, value;
    for (let c = 0, ccnt = colKeys.length; c < ccnt; c++) {
        colKey = colKeys[c];
        value = row[colKey];
        if (scope) {
            value = callback.call(scope, value, rowKey, colKey, table);
        }
        else {
            value = callback(value, rowKey, colKey, table);
        }
        row[colKey] = value;
    }
}
function ConvertCol(table, colKey, callback = Convert, scope) {
    if (Array.isArray(colKey)) {
        for (let i = 0, cnt = colKey.length; i < cnt; i++) {
            ConvertCol(table, colKey[i], callback, scope);
        }
        return;
    }
    if (!HasColKey(table, colKey)) {
        return;
    }
    let data = table.data;
    let row, rowKeys = table.rowKeys, rowKey, value;
    for (let r = 0, rcnt = rowKeys.length; r < rcnt; r++) {
        rowKey = rowKeys[r];
        row = data[rowKey];
        value = row[colKey];
        if (scope) {
            value = callback.call(scope, value, rowKey, colKey, table);
        }
        else {
            value = callback(value, rowKey, colKey, table);
        }
        row[colKey] = value;
    }
}

function EachRow(table, callback, scope) {
    let rowKeys = table.rowKeys, rowKey;
    for (let i = 0, cnt = rowKeys.length; i < cnt; i++) {
        rowKey = rowKeys[i];
        if (scope) {
            callback.call(scope, rowKey, table);
        }
        else {
            callback(rowKey, table);
        }
    }
}
function EachCol(table, callback, scope) {
    let colKeys = table.colKeys, colKey;
    for (let i = 0, len = colKeys.length; i < len; i++) {
        colKey = colKeys[i];
        if (scope) {
            callback.call(scope, colKey, table);
        }
        else {
            callback(colKey, table);
        }
    }
}

function Set(table, rowKey, colKey, value) {
    if (!HasKey(table, rowKey, colKey)) {
        return;
    }
    let data = table.data;
    if (!data.hasOwnProperty(rowKey)) {
        data[rowKey] = {};
    }
    data[rowKey][colKey] = value;
}
function Add(table, rowKey, colKey, value = 1) {
    if (!HasKey(table, rowKey, colKey)) {
        return;
    }
    let data = table.data;
    if (!data.hasOwnProperty(rowKey)) {
        data[rowKey] = {};
    }
    let row = data[rowKey];
    if (!row.hasOwnProperty(colKey)) {
        row[colKey] = 0;
    }
    row[colKey] += value;
}

function AppendRow(table, rowKey, callback = 0, scope) {
    if (!HasRowKey(table, rowKey)) {
        return;
    }
    let isCallbackMode = (typeof (callback) === 'function');
    let initValue = (isCallbackMode) ? undefined : callback;
    table.rowKeys.push(rowKey);
    let row = {};
    table.data[rowKey] = row;
    let colKeys = table.colKeys, colKey, value;
    for (let i = 0, cnt = colKeys.length; i < cnt; i++) {
        colKey = colKeys[i];
        if (isCallbackMode) {
            if (scope) {
                value = callback.call(scope, table, rowKey, colKey);
            }
            else {
                value = callback(table, rowKey, colKey);
            }
        }
        else {
            value = initValue;
        }
        row[colKey] = value;
    }
}
function AppendCol(table, colKey, callback = 0, scope) {
    if (!HasColKey(table, colKey)) {
        return;
    }
    let isCallbackMode = (typeof (callback) === 'function');
    let initValue = (isCallbackMode) ? undefined : callback;
    table.colKeys.push(colKey);
    let data = table.data;
    let rowKeys = table.rowKeys, rowKey, value;
    for (let i = 0, cnt = rowKeys.length; i < cnt; i++) {
        rowKey = rowKeys[i];
        if (isCallbackMode) {
            if (scope) {
                value = callback.call(scope, table, rowKey, colKey);
            }
            else {
                value = callback(table, rowKey, colKey);
            }
        }
        else {
            value = initValue;
        }
        data[rowKey][colKey] = value;
    }
}

var SortMode;
(function (SortMode) {
    SortMode[SortMode["ascending"] = 0] = "ascending";
    SortMode[SortMode["descending"] = 1] = "descending";
    SortMode[SortMode["logical_ascending"] = 2] = "logical_ascending";
    SortMode[SortMode["logical_descending"] = 3] = "logical_descending";
})(SortMode || (SortMode = {}));

function SortRow(table, callback, scope) {
    let sortCallback;
    if (typeof (callback) === 'function') {
        if (scope) {
            sortCallback = callback.bind(scope);
        }
        else {
            sortCallback = callback;
        }
    }
    else {
        let rowKey = callback;
        if (!HasRowKey(table, rowKey)) {
            return;
        }
        let mode = scope;
        if (typeof (mode) === 'string') {
            mode = SortMode[mode];
        }
        sortCallback = function (colKeyA, colKeyB) {
            let valA = Get(table, colKeyA, colKeyB);
            let valB = Get(table, colKeyA, colKeyB);
            let retVal;
            if ((mode === SortMode.logical_ascending) || (mode === SortMode.logical_descending)) {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            }
            switch (mode) {
                case SortMode.ascending:
                case SortMode.logical_ascending:
                    retVal = (valA > valB) ? 1 :
                        (valA < valB) ? -1 : 0;
                    break;
                case SortMode.descending:
                case SortMode.logical_descending:
                    retVal = (valA < valB) ? 1 :
                        (valA > valB) ? -1 : 0;
                    break;
            }
            return retVal;
        };
    }
    table.colKeys.sort(sortCallback);
}
function SortCol(table, callback, scope) {
    let sortCallback;
    if (typeof (callback) === 'function') {
        if (scope) {
            sortCallback = callback.bind(scope);
        }
        else {
            sortCallback = callback;
        }
    }
    else {
        let colKey = callback;
        if (!HasColKey(table, colKey)) {
            return;
        }
        let mode = scope;
        if (typeof (mode) === 'string') {
            mode = SortMode[mode];
        }
        sortCallback = function (rowKeyA, rowKeyB) {
            let valA = Get(table, rowKeyA, colKey);
            let valB = Get(table, rowKeyB, colKey);
            let retVal;
            if ((mode === SortMode.logical_ascending) || (mode === SortMode.logical_descending)) {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            }
            switch (mode) {
                case SortMode.ascending:
                case SortMode.logical_ascending:
                    retVal = (valA > valB) ? 1 :
                        (valA < valB) ? -1 : 0;
                    break;
                case SortMode.descending:
                case SortMode.logical_descending:
                    retVal = (valA < valB) ? 1 :
                        (valA > valB) ? -1 : 0;
                    break;
            }
            return retVal;
        };
    }
    table.rowKeys.sort(sortCallback);
}

function NextColKey(table, colKey, step = 1, wrap = true) {
    let colKeys = table.colKeys;
    let idx = colKeys.indexOf(colKey);
    if (idx === -1) {
        return undefined;
    }
    idx += step;
    if (wrap) {
        idx = idx % colKeys.length;
    }
    return colKeys[idx];
}
function PreviousColKey(table, colKey, step = 1, wrap = true) {
    return NextColKey(table, colKey, -step, wrap);
}
function NextRowKey(table, rowKey, step = 1, wrap = true) {
    let rowKeys = table.rowKeys;
    let idx = rowKeys.indexOf(rowKey);
    if (idx === -1) {
        return undefined;
    }
    idx += step;
    if (wrap) {
        idx = idx % rowKeys.length;
    }
    return rowKeys[idx];
}
function PreviousRowKey(table, rowKey, step = 1, wrap = true) {
    return NextRowKey(table, rowKey, -step, wrap);
}

function IsValueInRow(table, rowKey, value) {
    if (!HasRowKey(table, rowKey)) {
        return false;
    }
    let row = table.data[rowKey];
    let colKeys = table.colKeys, colKey;
    for (let i = 0, cnt = colKeys.length; i < cnt; i++) {
        colKey = colKeys[i];
        if (row[colKey] === value) {
            return true;
        }
    }
    return false;
}
function IsValueInCol(table, colKey, value) {
    if (!HasColKey(table, colKey)) {
        return false;
    }
    let data = table.data;
    let rowKeys = table.rowKeys, rowKey;
    for (let i = 0, cnt = rowKeys.length; i < cnt; i++) {
        if (data[rowKey][colKey] === value) {
            return true;
        }
    }
    return false;
}

function SetCursor(table, rowKey = '', colKey = '') {
    table.cursor.rowKey = rowKey;
    table.cursor.colKey = colKey;
}

class Table {
    constructor(data) {
        this.data = {};
        this.rowKeys = [];
        this.colKeys = [];
        this.cursor = { colKey: '', rowKey: '' };
        if (data) {
            this.fromJSON({ data: data });
        }
    }
    fromJSON({ data = {}, row = undefined, col = undefined, cursor = undefined }) {
        Clear(this);
        if ((row === undefined) || (col === undefined)) {
            row = [];
            col = [];
            for (let rowKey in data) {
                row.push(rowKey);
            }
            if (row.length > 0) {
                let firstRow = data[row[0]];
                for (let colKey in firstRow) {
                    col.push(colKey);
                }
            }
        }
        Copy(this.rowKeys, row);
        Copy(this.colKeys, col);
        for (let j = 0, jcnt = row.length; j < jcnt; j++) {
            let rowKey = row[j];
            for (let i = 0, icnt = col.length; i < icnt; i++) {
                let colKey = col[i];
                Set(this, rowKey, colKey, data[rowKey][colKey]);
            }
        }
        if (cursor) {
            this.setCursor(cursor.rowKey, cursor.colKey);
        }
        else {
            this.setCursor();
        }
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
    loadCSV(csvString, config) {
        LoadCSV(this, csvString, config);
        this.setCursor();
        return this;
    }
    convertRow(rowKey, callback, scope) {
        ConvertRow(this, rowKey, callback, scope);
        return this;
    }
    convertCol(colKey, callback, scope) {
        ConvertCol(this, colKey, callback, scope);
        return this;
    }
    clear() {
        Clear(this);
        return this;
    }
    ;
    get(rowKey = this.curRowKey, colKey = this.curColKey) {
        let value = Get(this, rowKey, colKey);
        this.setCursor(rowKey, colKey);
        return value;
    }
    set(rowKey, colKey, value) {
        if (arguments.length === 1) {
            value = rowKey;
            rowKey = this.curRowKey;
            colKey = this.curColKey;
        }
        Set(this, rowKey, colKey, value);
        this.setCursor(rowKey, colKey);
        return this;
    }
    add(rowKey, colKey, value) {
        if (arguments.length <= 1) {
            value = (arguments.length === 0) ? 1 : rowKey;
            rowKey = this.curRowKey;
            colKey = this.curColKey;
        }
        Add(this, rowKey, colKey, value);
        this.setCursor(rowKey, colKey);
        return this;
    }
    hasRowKey(rowKey) {
        return HasRowKey(this, rowKey);
    }
    hasColKey(colKey) {
        return HasColKey(this, colKey);
    }
    hasKey(rowKey, colKey) {
        return HasKey(this, rowKey, colKey);
    }
    appendRow(rowKey, callback, scope) {
        AppendRow(this, rowKey, callback, scope);
        return this;
    }
    appendCol(colKey, callback, scope) {
        AppendCol(this, colKey, callback, scope);
        return this;
    }
    removeRol(rowKey) {
        RemoveRow(this, rowKey);
        return this;
    }
    removeCol(colKey) {
        RemoveCol(this, colKey);
        return this;
    }
    eachRow(callback, scope) {
        EachRow(this, callback, scope);
        return this;
    }
    eachCol(callback, scope) {
        EachCol(this, callback, scope);
        return this;
    }
    nextRowKey(rowKey = this.curRowKey, step, wrap) {
        let key = NextRowKey(this, rowKey, step, wrap);
        if (key) {
            this.cursor.rowKey = key;
        }
        return key;
    }
    nextColKey(colKey = this.curColKey, step, wrap) {
        let key = NextColKey(this, colKey, step, wrap);
        if (key) {
            this.cursor.colKey = key;
        }
        return key;
    }
    previousRowKey(rowKey = this.curRowKey, step, wrap) {
        let key = PreviousRowKey(this, rowKey, step, wrap);
        if (key) {
            this.cursor.rowKey = key;
        }
        return key;
    }
    previousColKey(colKey = this.curColKey, step, wrap) {
        let key = PreviousColKey(this, colKey, step, wrap);
        if (key) {
            this.cursor.colKey = key;
        }
        return key;
    }
    sortRow(callback, scope) {
        SortRow(this, callback, scope);
        return this;
    }
    sortCol(callback, scope) {
        SortCol(this, callback, scope);
        return this;
    }
    isValueInRoW(rowKey, value) {
        return IsValueInRow(this, rowKey, value);
    }
    isValueInCol(colKey, value) {
        return IsValueInCol(this, colKey, value);
    }
    get firstRowKey() {
        if (this.rowKeys.length === 0) {
            return '';
        }
        else {
            return this.rowKeys[0];
        }
    }
    get firstColKey() {
        if (this.colKeys.length === 0) {
            return '';
        }
        else {
            return this.colKeys[0];
        }
    }
    get curRowKey() {
        return this.cursor.rowKey;
    }
    get curColKey() {
        return this.cursor.colKey;
    }
    setCursor(rowKey = this.firstRowKey, colKey = this.firstColKey) {
        SetCursor(this, rowKey, colKey);
        return this;
    }
}

export { Table as TwoDTable };
