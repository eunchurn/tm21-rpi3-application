import dgram from "dgram";
import "dotenv/config";
import { daqParse } from "@libs/parser";
import { EventEmitter } from "events";

type DaqParse = Pick<
  ReturnType<typeof daqParse>,
  "header" | "noCh" | "noSample" | "samplingRate" | "station"
>;
interface Data extends DaqParse {
  channel: { [x: number]: number[] }[];
}

class DaqEvent extends EventEmitter {}
const daq = new DaqEvent();
const PORT = Number(process.env.DAQ_UDP_PORT);

const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on(
  "message",
  (data: Buffer): Data => {
    const timestamp = new Date();
    const daqData = daqParse(data);
    const { channel: daqChannelData } = daqData;
    const channel = daqChannelData.map((obj, index) => ({
      [index]: obj.data,
    }));
    const parsedData = {
      ...daqParse(data),
      timestamp: timestamp.valueOf(),
      channel,
    };
    // let { channel } = parsedData;
    // channel = parsedData.channel.map((obj, index) => {
    //   const { data } = obj;
    //   // obj[index] = obj.data;
    //   // delete obj.data;
    //   return data;
    // });
    daq.emit("data", parsedData);
    return parsedData;
  },
);

server.bind(PORT, () => {
  server.addMembership(process.env.DAQ_UDP_MULTI_HOST || "");
});

export default daq;
