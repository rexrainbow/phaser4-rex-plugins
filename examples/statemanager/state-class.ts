import { StateManager } from '../../src';

class StateC {
    name = 'C';
    i = 0;

    next() {
        this.i++;
        if (this.i < 3) {
            return 'A';
        } else {
            return 'D';
        }
    }

    enter(stateManager: StateManager) {
        console.log('enter C');
    }
}

class MyStates extends StateManager {
    constructor() {
        super();

        this.addStates([
            { name: 'A', next: 'B', enter() { console.log('enter A') } }, // A json state object
            { name: 'B', next: 'C', enter() { console.log('enter B') } },
            (new StateC()), // A state object
            { name: 'D', enter() { console.log('enter D') } },
        ])
            .goto('A');
    }
}

const states = new MyStates();
states.on('statechange', function () {
    console.log('StateChange');
});

for (let i = 0; i < 10; i++) {
    states.next();
}