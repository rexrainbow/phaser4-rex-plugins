import { RunCommands } from '../../src/logic/runcommands';

let CommandSet = {
    print(s: string, count: number = 1) {
        if (count == null) {
            count = 1;
        }
        for (let i = 0; i < count; i++) {
            console.log(s);
        }
    }
}

// Run single commnad
console.log('----');
RunCommands(['print', 'hello'], CommandSet);

// Run command queue
console.log('----');
RunCommands([
    ['print', 'hello'],
    ['print', 'world', 3],
], CommandSet);
