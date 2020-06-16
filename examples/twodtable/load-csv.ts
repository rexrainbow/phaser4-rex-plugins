import { TwoDTable } from '../../src/data/twodtable';

let csvString = `name,hp,mp
Rex,100,20
Alice,300,40`;

let table = new TwoDTable();
table.loadCSV(csvString);
console.log(table.get('Rex', 'mp'));
console.log(table.add('Rex', 'hp', 10).get('Rex', 'hp'));