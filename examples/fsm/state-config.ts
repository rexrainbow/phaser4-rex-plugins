import { CreateFSM } from '../../src/logic/fsm';

var stateConfig = {
    start: 'A',
    states: {
        A: {
            next: 'B',
            enter: function () {
                console.log('enter A')
            }
        },
        B: {
            next: 'C',
            enter: function () {
                console.log('enter B')
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
        i: 0
    }
};

let state = CreateFSM(stateConfig)
    .on('statechange', function () {
        console.log('StateChange');
    });

for (let i = 0; i < 10; i++) {
    state.next();
}