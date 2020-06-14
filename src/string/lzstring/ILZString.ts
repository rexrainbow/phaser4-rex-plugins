import { EncodeType, EncodeTypeString } from './IConfig'

export interface ILZString {
    encoding: number;

    setEncoding(m: EncodeType | EncodeTypeString): this;
    compress(s: string): string;
    decompress(s: string): string;
}