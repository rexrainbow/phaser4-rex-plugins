export enum TableType {
    '1d' = 1,
    '2d' = 2,
    '3d' = 3
}

export type TableTypeString = '1d' | '2d' | '3d';

export type TransactionCallbackType = (preValue: any) => any;