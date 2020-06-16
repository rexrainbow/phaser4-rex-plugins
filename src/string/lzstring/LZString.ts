import { LZString as lzstring } from '../../utils/string/lzstring'
import { ILZString, IConfig, EncodeType, EncodeTypeString } from './ILZString';

export class LZString implements ILZString {

    encoding: number;

    /**
     * Creates an instance of LZString.
     * @param {IConfig} [config]
     * @memberof LZString
     */
    constructor(config?: IConfig) {

        this.resetFromJSON(config);
    }

    /**
     * Reset state.
     *
     * @param {IConfig} [config]
     * @returns {this}
     * @memberof LZString
     */
    resetFromJSON(config?: IConfig): this {

        let encoding: EncodeType | EncodeTypeString;
        ({
            encoding = EncodeType.none
        } = config || {})

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
    setEncoding(m: EncodeType | EncodeTypeString = EncodeType.none): this {

        if (typeof (m) === 'string') {
            m = (EncodeType[m] || 0) as number;
        }
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