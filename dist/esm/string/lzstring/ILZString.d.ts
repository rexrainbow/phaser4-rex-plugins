export declare enum EncodeType {
    none = 0,
    base64 = 1,
    utf16 = 2,
    uri = 3
}
export declare type EncodeTypeString = 'none' | 'base64' | 'utf16' | 'uri';
export interface IConfig {
    encoding?: EncodeType | EncodeTypeString;
}
export interface ILZString {
    encoding: number;
    setEncoding(m: EncodeType | EncodeTypeString): this;
    compress(s: string): string;
    decompress(s: string): string;
}
//# sourceMappingURL=ILZString.d.ts.map