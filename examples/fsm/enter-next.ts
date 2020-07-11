import { CreateFSM } from '../../src/logic/fsm';

var stateConfig = {
    states: {
        A: {
            next: 'B',
            enter: function () {
                console.log('enter A')
                this.next();
            }
        },
        B: {
            next: 'C',
            enter: function () {
                console.log('enter B')
                this.next();
            }
        },
        C: {
            next: function () {
                this.i++;
                if (this.i < 3) {
                    return 'A';
                } else {
                    return 'D';
                }
            },
            enter: function () {
                console.log('enter C')
                this.next();
            },
            exit: function () {
                console.log('exit C, i=' + this.i)
            }
        },
        D: {
            enter: function () {
                console.log('enter D')
            }
        }
    },
    extend: {
        i: 0,
    }
    
};

let state = CreateFSM(stateConfig).goto('A');