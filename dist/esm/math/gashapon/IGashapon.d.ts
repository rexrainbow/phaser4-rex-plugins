export declare enum Mode {
    shuffle = 0,
    random = 1
}
export declare type ModeString = 'shuffle' | 'random';
export declare type ItemType = {
    [name: string]: number;
};
export declare type RNDObjType = {
    frac: () => number;
};
export interface IConfig {
    mode?: Mode | ModeString;
    reload?: boolean;
    items?: ItemType;
    rnd?: RNDObjType;
    result?: string | null;
    remainder?: ItemType;
}
export interface IGashapon {
    mode: Mode;
    items: {
        [name: string]: number;
    };
    remainder: {
        [name: string]: number;
    };
    reload: boolean;
    rnd: RNDObjType | undefined;
    result: string | null;
    next(name?: string): string | null;
}
//# sourceMappingURL=IGashapon.d.ts.map