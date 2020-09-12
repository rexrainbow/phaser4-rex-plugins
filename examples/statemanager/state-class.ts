import { StateManager } from '../../src';

class StateA {
    name = 'A';
    next = 'B';

    enter(stateManager: StateManager) {
        console.log('enter A');
    }
}

class StateB {
    name = 'B';
    next = 'C';

    enter(stateManager: StateManager) {
        console.log('enter B');
    }
}

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

class StateD {
    name = 'D';
    enter(stateManager: StateManager) {
        console.log('enter D');
    }
}

class MyStates extends StateManager {
    constructor() {
        super();

        this.addStates([
            (new StateA()),
            (new StateB()),
            (new StateC()),
            (new StateD())
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