import XOR from '../../src/string/xor/XOR';

let src = 'Hello world';
let pwd = 'aabbcc';
let encResult: string = XOR.encrypt(src, pwd);
let decResult: string = XOR.decrypt(encResult, pwd);

console.log(src);
console.log(encResult);
console.log(decResult);
console.log((decResult == src));