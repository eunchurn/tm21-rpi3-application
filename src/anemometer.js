import net from "net";
import "dotenv/config";
import EventEmitter from "events";
import { anemoParse } from '../libs/parser';

class anemoEvent extends EventEmitter {}
const anemometer = new anemoEvent();

const client = net.createConnection(
  {
    host: process.env.ANEMOMETER_HOST,
    port: process.env.ANEMOMETER_PORT
  },
  () => {
    console.log("connected to Anemometer server");
  }
);

let anemoData = [];
client.on("data", data => {
  if (data[data.length-1] === 10) {
    anemoData.push(data);
    const joinedData = Buffer.concat(anemoData);
    console.log(anemoParse(joinedData))
    anemoData = [];
  } else {
    anemoData.push(data);
  }
  // console.log(data.toString())
  
  // console.log("received: ", data.length, data);
  // console.log(data.toString("utf8"));

  // if(i == 0)	wind_data.utc			= (int)tm_sec;
  // if(i == 1)	wind_data.windDirection	= atoi(token);		// short
  // if(i == 2)	wind_data.windSpeed		= atof(token);		// float
  // if(i == 4)	wind_data.status		= atoi(token);
  anemometer.emit("data", data);
});
client.on("end", () => {
  console.log("disconnected from server");
});

export default anemometer;
