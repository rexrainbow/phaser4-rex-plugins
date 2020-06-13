import { XOR } from '../../src/string/xor/XOR';

let src = 'Hello world';
let pwd = 'aabbcc';
let xor = new XOR();
let encResult = xor.encrypt(src, pwd);
let decResult = xor.decrypt(encResult, pwd);

console.log(src);
console.log(encResult);
console.log(decResult);
console.log((decResult == src));