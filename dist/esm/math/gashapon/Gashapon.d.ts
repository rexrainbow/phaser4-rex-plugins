import { IGashapon, IConfig, IState, Mode, ModeString, ItemType, RNDObjType } from './IGashapon';
export declare class Gashapon implements IGashapon {
    mode: Mode;
    items: ItemType;
    remainder: ItemType;
    reload: boolean;
    rnd: RNDObjType | undefined;
    result: string | null;
    private _restartFlag;
    private _list;
    constructor(config?: IConfig);
    fromJSON({ mode, reload, items, result, remainder, rnd }: IState): this;
    toJSON(): IState;
    setMode(m: Mode | ModeString): this;
    setReload(isReload?: boolean): this;
    setRND(rnd?: RNDObjType): this;
    setItem(name: string, count: number): this;
    setItems(items?: ItemType): this;
    removeItem(name: string): this;
    removeAllItems(): this;
    addItem(name: string, count?: number): this;
    putItemBack(name: string, count?: number): this;
    next(name?: string): string | null;
    getItems(): ItemType;
    getRemain(): ItemType;
    getItemCount(name: string): number;
    getRemainCount(name: string): number;
    forEachItem(callback: (name: string, count: number) => boolean | undefined, scope?: object): this;
    forEachRemain(callback: (name: string, count: number) => boolean | undefined, scope?: object): this;
    destroy(): void;
    private startGen;
    private resetItemList;
    private addRemainItem;
    private getRndItem;
}
//# sourceMappingURL=Gashapon.d.ts.map