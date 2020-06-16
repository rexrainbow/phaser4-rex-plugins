import { XOR } from '../../src/string/xor';

let src = 'Hello world';
let pwd = 'aabbcc';
let encResult = XOR.encrypt(src, pwd);
let decResult = XOR.decrypt(encResult, pwd);

console.log(src);
console.log(encResult);
console.log(decResult);
console.log((decResult == src));