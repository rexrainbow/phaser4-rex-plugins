import { FSM } from '../../src';

class State extends FSM {
    i: number = 0;

    constructor() {
        super();

        this.goto('A');
    }

    next_A() {
        return 'B';
    }

    next_B() {
        return 'C';
    }

    next_C() {
        this.i++;
        if (this.i < 3) {
            return 'A';
        } else {
            return 'D';
        }
    }

    enter_A() {
        console.log('enter A');
    }

    enter_B() {
        console.log('enter B');
    }

    enter_C() {
        console.log('enter C');
    }

    exit_C() {
        console.log('exit C, i=' + this.i);
    }

    enter_D() {
        console.log('enter D');
    }
}

let state = new State();
state.on('statechange', function () {
    console.log('StateChange');
});

for (let i = 0; i < 10; i++) {
    state.next();
}