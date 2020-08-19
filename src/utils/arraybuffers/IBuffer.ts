export interface IBuffer {
    get(
        offset: number
    ): number;

    set(
        offset: number,
        value: number
    ): this;

    fill(
        value: number
    ): this;

    resize(
        size: number
    ): this;
}

export interface IBufferConstructor {
    new(
        size: number
    ): IBuffer;
}