import EventEmitter from "events";
import plc1 from "./plc1";
import plc2 from "./plc2";
import { addData, stackPLC } from "@libs/stackData";

class plcEvent extends EventEmitter {}
const plc = new plcEvent();

plc1.on("data", data => {
  addData("PLC", data);
});

plc2.on("data", data => {
  addData("PLC", data);
});

setInterval(() => {
  stackPLC("PLC")
    .then(data => plc.emit("data", data))
    .catch(console.log);
},1000);

export default plc;
