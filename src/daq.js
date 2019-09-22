import dgram from "dgram";
import "dotenv/config";
import { dataParse } from "@libs/daqParser";
import redisHandler from "@libs/redisHandler";
const server = dgram.createSocket("udp4");

const redisClient = new redisHandler();
redisClient.connect();

server.on("error", err => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", data => {
  const timestamp = new Date;
  const parsedData = dataParse(data);
  parsedData.timestamp = timestamp.valueOf();
  parsedData.channel = parsedData.channel.map((obj, index) => {
    obj[index] = obj.data;
    delete obj.data;
    return obj;
  });
  console.log(parsedData)
});

server.bind(58432, () => {
  server.addMembership('234.5.6.7');
});
