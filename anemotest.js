import { anemoParse } from './libs/parser';
// Q,031,000.53,M,00,1A
const data0 = Buffer.from('02512c3033312c3030302e35332c4d2c30302c0331410d0a', 'hex');

const data1 = Buffer.from('02512c3039322c30', 'hex');
const data2 = Buffer.from('30312e31332c4d2c', 'hex');
const data3 = Buffer.from('30302c0331360d0a', 'hex');

const newData = [data1, data2, data3];
console.log(Buffer.concat(newData))
console.log(data0)

let anemoData = [];

newData.map(data => {
  if (data[data.length-1] === 10) {
    anemoData.push(data);
    const joinedData = Buffer.concat(anemoData);
    console.log(joinedData)
    console.log(anemoParse(joinedData))
    anemoData = [];
  } else {
    anemoData.push(data);
  }
})