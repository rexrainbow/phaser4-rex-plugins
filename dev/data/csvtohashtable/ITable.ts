export interface ITable {
    data: [any[]];

    rowKeys: string[];

    colKeys: string[];

    cursor: {
        colKey: string,
        rowKey: string
    };
}