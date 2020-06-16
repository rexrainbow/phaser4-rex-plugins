import { RunCommands } from '../../src/logic/runcommands';
import { CSVToArray } from '../../src/data/csvtoarray';

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

let csvString = `\
print,hello,
print,world,3`;
let commands = CSVToArray(csvString);
console.log(commands);
RunCommands(commands, CommandSet);