export function GetEmptyItemIndex<T>(
    columnIndex: number,
    rowIndex: number | true,
    items: T[],
    columnCount: number,
    rowCount: number
): number {

    if ((typeof (columnIndex) === 'number') && (typeof (rowIndex) === 'number')) {
        // Is (columnIndex, rowIndex) empty?
        let index = (rowIndex * columnCount) + columnIndex;
        if (!items[index]) {
            return index;
        }


    } else if ((rowIndex === undefined) && (typeof (columnIndex) === 'number')) {
        // Search on column
        for (let i = 0; i < rowCount; i++) {
            let index = (i * columnCount) + columnIndex;
            if (!items[index]) {
                return index;
            }
        }

    } else if ((columnIndex === undefined) && (typeof (rowIndex) === 'number')) {
        // Search on row
        for (let i = 0; i < columnCount; i++) {
            let index = (rowIndex * columnCount) + i;
            if (!items[index]) {
                return index;
            }
        }

    } else if (rowIndex === true) {
        // Search on row then column
        for (let i = 0; i < columnCount; i++) {
            for (let j = 0; j < rowCount; j++) {
                let index = (j * columnCount) + i;
                if (!items[index]) {
                    return index;
                }
            }
        }

    } else {
        // Search on column then row
        for (let i = 0, cnt = items.length; i < cnt; i++) {
            if (!items[i]) {
                return i;
            }
        }
    }

    return null;
}