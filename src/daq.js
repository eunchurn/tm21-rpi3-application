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
  console.log(data)
  const parsedData = dataParse(data);
  parsedData.channel = parsedData.channel.map((obj, index) => {
    obj[index] = obj.data;
    delete obj.data;
    return obj;
  });
  redisClient.zaddData("DAQ", parsedData);
});

setInterval(function() {
  redisClient.exists("DAQ", (err, rexist) => {
    if (rexist) {
      redisClient.stackData("DAQ", "DAQRT", 1000); // cache to stack Redis Key, duration : 10ms
    }
  });
}, 1000);

const getDataAndEmit = async socket => {
  try {
    const res = await redisClient.client.get("DAQRT", (err, data) => {
      // socket.emit("FromAPI", JSON.parse(data));
      // MQTT sender
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

server.bind(58432, () => {
  socket.setMulticastInterface('234.5.6.7');
});
