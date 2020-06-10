import lzstring from '../../utils/lzstring/lz-string.min.js';

class LZStringKlass {
    constructor(config) {
        this.resetFromJSON(config);
    }

    resetFromJSON({encoding= 0}) {
        this.setEncoding(encoding);
        return this;
    }

    toJSON() {
        return {
            encoding: this.encoding
        };
    }

    setEncoding(m) {
        if (m === undefined) {
            m = 0;
        } else if (typeof (m) === 'string') {
            m = ENCODINGMAP[m.toLowerCase()] || 0;
        }
        this.encoding = m;
        return this;
    }

    compress(s) {
        var fnName = COMPRESSFNNAME[this.encoding];
        return lzstring[fnName](s);
    }

    decompress(s) {
        var fnName = DECOMPRESSFNNAME[this.encoding];
        return lzstring[fnName](s);
    }
}

const ENCODINGMAP = {
    none: 0,
    base64: 1,
    utf16: 2,
    uri: 3
};

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

export default LZStringKlass;