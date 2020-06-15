import { Mode, RNDObjType } from './IConfig';

export interface IGashapon {
    mode: Mode;
    items: { [name: string]: number };
    remainder: { [name: string]: number };
    reload: boolean;
    rnd: RNDObjType | undefined;
    result: string | null;

    next(name?: string): string | null;
}