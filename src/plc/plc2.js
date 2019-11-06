import net from "net";
import "dotenv/config";
import { plcParse } from "@libs/parser";
import compare from "buffer-compare";
import EventEmitter from "events";

class PlcEvent extends EventEmitter {}
const plc = new PlcEvent();

const plcSend = Buffer.from(process.env.PLC_SEND_PACKET2, "hex"); // 100Hz
const client = net.createConnection(
  {
    host: process.env.PLC_HOST,
    port: process.env.PLC_PORT,
  },
  () => {
    console.log("connected to PLC server");
    setInterval(() => {
      client.write(plcSend);
    }, 10);
  },
);
let compData = Buffer.from("");
client.on("data", data => {
  if (compare(compData, data)) {
    compData = data;
  } else {
    plc.emit("data", plcParse(data));
  }
});
client.on("end", () => {
  console.log("disconnected from server");
});

export default plc;
