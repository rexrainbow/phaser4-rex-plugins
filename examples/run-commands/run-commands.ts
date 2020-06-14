import { RunCommands } from '../../src/logic/runcommands/RunCommands';

let Scope = {
    print(s: string, count: number = 1) {
        for (let i = 0; i < count; i++) {
            console.log(s);
        }
    }
}

// Run single commnad
console.log('----');
RunCommands(['print', 'hello'], Scope);

// Run command queue
console.log('----');
RunCommands([
    ['print', 'hello'],
    ['print', 'world', 3],
], Scope);
