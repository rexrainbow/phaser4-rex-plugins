import { FSM } from './FSM';
import {
    IFSM,
    StatesDefineType
} from './IFSM';

interface IConfig {
    start?: string;
    states?: StatesDefineType;
    extend?: { [propName: string]: unknown };
    init?: (() => void);
    enable?: boolean;
    eventEmitter?: boolean;
}

/*
let config = {
    start: 'A',   // default: undefined
    states: {
        A: {
            next: 'B',  // function() { return 'B'; }
            enter: function() {},
            exit: function() {}
        },
        // ...
    },        
    extend: {
        i: 0,
        name: 'abc'
        // ...
    },
    init: function() {},
    enable: true,
    eventEmitter: true,
};
*/
export let CreateFSM = function ({
    states,
    extend,
    eventEmitter = true,
    enable = true,
    start,
    init
}: IConfig = {}): IFSM {

    const fsm = new FSM({ eventEmitter: eventEmitter });

    fsm.setEnable(enable);

    // Attach get-next-state function
    if (states) {
        fsm.addStates(states);
    }

    // Attach extend members
    if (extend) {
        for (let name in extend) {
            if (!fsm.hasOwnProperty(name) || fsm[name] === undefined) {
                fsm[name] = extend[name];
            }
        }
    }

    if (init) {
        init.call(fsm);
    }

    if (start) {
        fsm.start(start);
    }

    return fsm;
}