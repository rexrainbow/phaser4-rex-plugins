import LZString from '../../src/string/lzstring/LZString'

let lzString = new LZString();

let s = 'Hello world';
let compressResult = lzString.compress(s);
let decompressResult = lzString.decompress(compressResult);

if (s === decompressResult) {
    console.log('pass')
} else {
    console.log('fail', s, decompressResult)
}
