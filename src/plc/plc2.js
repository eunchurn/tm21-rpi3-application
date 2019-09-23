import net from "net";
import "dotenv/config";
import { plcParser } from "@libs/parser";
import compare from "buffer-compare";
import EventEmitter from "events";

class plcEvent extends EventEmitter {}
const plc = new plcEvent();

const plcSend = new Buffer.from(process.env.PLC_SEND_PACKET2, "hex"); // 100Hz
const client = net.createConnection(
  {
    host: process.env.PLC_HOST,
    port: process.env.PLC_PORT
  },
  () => {
    console.log("connected to PLC server");
    setInterval(() => {
      client.write(plcSend);
    }, 10);
  }
);
let compData = new Buffer.from("");
client.on("data", data => {
  compare(compData, data)
    ? (compData = data)
    : plc.emit("data", plcParser.parse(data));
});
client.on("end", () => {
  console.log("disconnected from server");
});

export default plc;
