export type DataType = { [name: string]: DataType | string | number };
export type ValueType = DataType | string | number;

export interface ITree {
    setValue(
        keys?: string | DataType,
        value?: unknown
    ): void;

    getValue(
        keys?: string | string[]
    ): ValueType;

    removeKey(
        keys?: string | string[]
    ): void;

    clear(): void;
}