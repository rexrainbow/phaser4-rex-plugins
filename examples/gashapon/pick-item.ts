import { Gashapon } from '../../src/math/gashapon';

let gashapon = new Gashapon({
    mode: 'shuffle',
    items: {
        a: 1, b: 2, c: 3
    },
    reload: false
});

console.log("Pick a: " + gashapon.next('a'));

for (let i = 0; i < 6; i++) {
    console.log("Random pick: " + gashapon.next());
}

console.log("Pick a: " + gashapon.next('a'));