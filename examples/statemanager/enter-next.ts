import { StateManager } from '../../src';

class StateA {
    next = 'B';

    enter(stateManager: StateManager) {
        console.log('enter A');
        stateManager.next();
    }
}

class StateB {
    next = 'C';

    enter(stateManager: StateManager) {
        console.log('enter B');
        stateManager.next();
    }
}

class StateC {
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
        stateManager.next();
    }
    exit(stateManager: StateManager) {
        console.log('exit C, i=' + this.i)
    }
}

class StateD {
    enter(stateManager: StateManager) {
        console.log('enter D');
    }
}

class MyStates extends StateManager {
    constructor() {
        super();

        this.addStates({
            A: (new StateA()),
            B: (new StateB()),
            C: (new StateC()),
            D: (new StateD())
        })
            .goto('A');
    }
}

const states = new MyStates();