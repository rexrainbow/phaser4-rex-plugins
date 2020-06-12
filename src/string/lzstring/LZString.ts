import lzstring from './lz-string.min.js';

export enum EncodeType {
    none,
    base64,
    utf16,
    uri
};

export type ConfigType = {
    encoding?: EncodeType
};
;

export class LZString {

    encoding: number;

    /**
     * Creates an instance of LZString.
     * @param {ConfigType} [config]
     * @memberof LZString
     */
    constructor(config?: ConfigType) {
        if (config === undefined) {
            config = {};
        }
        this.resetFromJSON(config);
    }

    /**
     * Reset configuration.
     *
     * @param {ConfigType} { encoding = EncodeType.none }
     * @returns {this}
     * @memberof LZString
     */
    resetFromJSON({ encoding = EncodeType.none }: ConfigType): this {
        this.setEncoding(encoding);
        return this;
    }

    /**
     * Get state of this instance.
     *
     * @returns {object} State
     * @memberof LZString
     */
    toJSON(): object {
        return {
            encoding: this.encoding
        };
    }

    /**
     * Set encoding type.
     *
     * @param {EncodeType} [m=EncodeType.none] Encoding type
     * @returns {this}
     * @memberof LZString
     */
    setEncoding(m: EncodeType = EncodeType.none): this {
        this.encoding = m;
        return this;
    }

    /**
     * Compress source string
     *
     * @param {string} s Source string
     * @returns {string} Compression result
     * @memberof LZString
     */
    compress(s: string): string {
        let fnName = COMPRESSFNNAME[this.encoding];
        return lzstring[fnName](s);
    }

    /**
     * Decompress result string.
     *
     * @param {string} s Compression result
     * @returns {string} Source string
     * @memberof LZString
     */
    decompress(s: string): string {
        let fnName = DECOMPRESSFNNAME[this.encoding];
        return lzstring[fnName](s);
    }
}

const COMPRESSFNNAME = [
    'compress',
    'compressToBase64',
    'compressToUTF16',
    'compressToEncodedURIComponent'
];
const DECOMPRESSFNNAME = [
    'decompress',
    'decompressFromBase64',
    'decompressFromUTF16',
    'decompressFromEncodedURIComponent'
];