import dgram from "dgram";
import "dotenv/config";
import cbor from "cbor-sync";
import mqtt from "mqtt";
import chalk from "chalk";
import { dataParse } from "@libs/daqParser";
const server = dgram.createSocket("udp4");

const client = mqtt.connect(process.env.MQTT_HOST);
client.on("connect", () => {
  console.log(
    `${new Date().toISOString()}  | ${chalk.green("✓")} MQTT client connected ${
      process.env.MQTT_HOST
    }`
  );
});
client.subscribe(process.env.MQTT_DAQ_TOPIC, err => {
  if (err) console.log(err);
  console.log(
    `${new Date().toISOString()}  | ${chalk.green("✓")} subscribe : ${
      process.env.MQTT_DAQ_TOPIC
    }, QoS : ${process.env.MQTT_QOS}`
  );
});
client.on("close", () => {
  console.log(
    `${new Date().toISOString()}  | ${chalk.red("✗")} MQTT client disconnected`
  );
});

server.on("error", err => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", data => {
  const timestamp = new Date();
  const parsedData = dataParse(data);
  parsedData.timestamp = timestamp.valueOf();
  parsedData.channel = parsedData.channel.map((obj, index) => {
    obj[index] = obj.data;
    delete obj.data;
    return obj;
  });
  client.publish(process.env.MQTT_DAQ_TOPIC, cbor.encode(parsedData));
});

server.bind(58432, () => {
  server.addMembership("234.5.6.7");
});
