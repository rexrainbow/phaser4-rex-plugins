import { ILZString, IConfig, EncodeType, EncodeTypeString } from './ILZString';
export declare class LZString implements ILZString {
    encoding: number;
    constructor(config?: IConfig);
    resetFromJSON(config?: IConfig): this;
    toJSON(): object;
    setEncoding(m?: EncodeType | EncodeTypeString): this;
    compress(s: string): string;
    decompress(s: string): string;
}
//# sourceMappingURL=LZString.d.ts.map