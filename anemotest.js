import { anemoParse } from './libs/parser';
// Q,031,000.53,M,00,1A
const data = Buffer.from('02512c3033312c3030302e35332c4d2c30302c0331410d0a', 'hex');

console.log(data[data.length-1] === 10)

console.log(anemoParse(data))