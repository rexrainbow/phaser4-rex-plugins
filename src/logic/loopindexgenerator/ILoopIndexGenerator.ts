export type CurrentIndexesType = { [key: string]: number | any };

export type AddLoopConfig = {
    key: string,
    start: number,
    end: number,
    step: number,
    items?: any[]
}