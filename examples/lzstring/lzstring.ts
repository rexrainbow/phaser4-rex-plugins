import {
    LZString,
    LZStringEncodeType as EncodeType,
    ILZStringConfig as IConfig
} from '../../src/index'

let dump = function (src: string, result0: string, result1: string) {
    console.log(src);
    console.log(result0);
    console.log(result1);
    console.log((src === result1) ? 'pass' : 'fail');
}

let lzString = new LZString();

let src = 'Hello world';
let compressResult = lzString.compress(src);
let decompressResult = lzString.decompress(compressResult);
console.log(`---- Encode = ${lzString.encoding} ----`)
dump(src, compressResult, decompressResult);

// Set encode type to base64
lzString.setEncoding(EncodeType.base64);
compressResult = lzString.compress(src);
decompressResult = lzString.decompress(compressResult);
console.log(`---- Encode = ${lzString.encoding} ----`)
dump(src, compressResult, decompressResult);

// Set encode type to utf16
lzString.setEncoding('utf16');
compressResult = lzString.compress(src);
decompressResult = lzString.decompress(compressResult);
console.log(`---- Encode = ${lzString.encoding} ----`)
dump(src, compressResult, decompressResult);
