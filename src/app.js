import "dotenv/config";
import cbor from "cbor-sync";
import mqtt from "mqtt";
import chalk from "chalk";
import daq from "./daq";
import plc from "./plc";

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

daq.on("data", data => {
  client.publish(process.env.MQTT_DAQ_TOPIC, cbor.encode(data));
});

plc.on("data", data => {
  client.publish(process.env.MQTT_PLC_TOPIC, cbor.encode(data))
})
