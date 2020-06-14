import { Gashapon } from '../../src/math/gashapon/Gashapon';

let gashapon = new Gashapon({
    mode: 'shuffle',
    items: {
        a: 1, b: 2, c: 3
    },
    // reload: false // Disable reload feature. `gashapon.next()` will return null
});
for (let i = 0; i < 12; i++) {
    console.log("Random pick: " + gashapon.next());
}