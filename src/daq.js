import dgram from "dgram";
import { daqParse } from "@libs/parser";
import EventEmitter from 'events';

class daqEvent extends EventEmitter {}
const daq = new daqEvent();

const server = dgram.createSocket("udp4");

server.on("error", err => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", data => {
  const timestamp = new Date();
  const parsedData = daqParse(data);
  parsedData.timestamp = timestamp.valueOf();
  parsedData.channel = parsedData.channel.map((obj, index) => {
    obj[index] = obj.data;
    delete obj.data;
    return obj;
  });
  daq.emit('data', parsedData);
});

server.bind(58432, () => {
  server.addMembership("234.5.6.7");
});

export default daq;
