import dgram from "dgram";
import "dotenv/config";
import { daqParse } from "@libs/parser";
import EventEmitter from "events";

class DaqEvent extends EventEmitter {}
const daq = new DaqEvent();
const PORT = Number(process.env.DAQ_UDP_PORT);

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
  daq.emit("data", parsedData);
});

server.bind(PORT, () => {
  server.addMembership(process.env.DAQ_UDP_MULTI_HOST);
});

export default daq;
