import { ILZString, IConfig, IState, EncodeType, EncodeTypeString } from './ILZString';
export declare class LZString implements ILZString {
    encoding: number;
    constructor(config?: IConfig);
    fromJSON({ encoding }: IState): this;
    toJSON(): IState;
    setEncoding(m?: EncodeType | EncodeTypeString): this;
    compress(s: string): string;
    decompress(s: string): string;
}
//# sourceMappingURL=LZString.d.ts.map