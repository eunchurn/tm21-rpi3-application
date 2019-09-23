import { spawn } from "child_process";
import "dotenv/config";
import EventEmitter from "events";

class anemoEvent extends EventEmitter {}
const anemometer = new anemoEvent();

const netcat = spawn('netcat', [process.env.ANEMOMETER_HOST, process.env.ANEMOMETER_PORT]);

netcat.stdout.on('data', (data) => {
  console.log(data.toString())
})

// const client = net.createConnection(
//   {
//     host: process.env.ANEMOMETER_HOST,
//     port: process.env.ANEMOMETER_PORT
//   },
//   () => {
//     console.log("connected to Anemometer server");
//   }
// );

// client.on("data", data => {
//   console.log("received: ",
//     data.toString('utf8')
//   );

//   // if(i == 0)	wind_data.utc			= (int)tm_sec;
//   // if(i == 1)	wind_data.windDirection	= atoi(token);		// short
//   // if(i == 2)	wind_data.windSpeed		= atof(token);		// float
//   // if(i == 4)	wind_data.status		= atoi(token);
//   anemometer.emit("data", data);
// });
// client.on("end", () => {
//   console.log("disconnected from server");
// });

export default anemometer;