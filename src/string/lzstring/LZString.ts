import { LZString as lzstring } from '../../utils/string/lzstring'
import { ILZString, IConfig, IState, EncodeType, EncodeTypeString } from './ILZString';

export class LZString implements ILZString {

    encoding: number;

    /**
     * Creates an instance of LZString.
     * @param {IConfig} [{
     *         encoding = EncodeType.none
     *     }={}]
     * @memberof LZString
     */
    constructor({
        encoding = EncodeType.none
    }: IConfig = {}) {

        this.setEncoding(encoding);
    }

    /**
     * Reset state.
     *
     * @param {IState} [{
     *         encoding = EncodeType.none
     *     }={}]
     * @returns {this}
     * @memberof LZString
     */
    fromJSON({
        encoding = EncodeType.none
    }: IState = {}): this {

        this.setEncoding(encoding);
        return this;
    }

    /**
     * Get state.
     *
     * @returns {IState} State
     * @memberof LZString
     */
    toJSON(): IState {

        return {
            encoding: this.encoding
        };
    }

    /**
     * Set encoding type.
     *
     * @param {(EncodeType | EncodeTypeString)} [m=EncodeType.none]
     * @returns {this}
     * @memberof LZString
     */
    setEncoding(m: EncodeType | EncodeTypeString = EncodeType.none): this {

        if (typeof (m) === 'string') {
            m = EncodeType[m];
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