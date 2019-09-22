import "dotenv/config";
import redis from "redis";

class redisHandler {
  constructor() {
    this.client = redis.createClient({
      host: process.env.REDIS_SERVER_HOST,
      port: process.env.REDIS_SERVER_PORT,
      password: process.env.REDIS_SERVER_PASSWORD
    });
  }

  connect() {
    this.client.on("error", err => {
      console.log(err);
      // this.client.end();
    });

    this.client.on("connect", () => {
      console.log("redis connected");
    });
  }
  zaddData(key, data) {
    this.client.zadd(key, new Date().getTime(), JSON.stringify(data));
  }
  zrangeData(key, start, end, callback) {
    this.client.zrange(key, start, end, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        callback(data);
      }
    });
  }
  exists(key, callback) {
    this.client.exists(key, (err, rexist) => {
      callback(err, rexist);
    });
  }

  stackData(key, stackKey, duration) {
    try {
      this.client.zrange(key, 0, -1, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          this.client.del(key);
          const arrayJSON = data.map(str => JSON.parse(str));

          let dataCh = {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": []
          };
          if (arrayJSON[0].hasOwnProperty("channel")) {
            arrayJSON.map(obj =>
              obj.channel.map((ch, index) => {
                dataCh[index] = [...dataCh[index], ...ch[index]];
                return dataCh;
              })
            );
            // this.zaddData(`${key}_STACK`, JSON.stringify(dataCh)); => Queue progress
            const Time = [];
            const dataLength = dataCh["0"].length;
            const ini = new Date().getTime();
            dataCh["0"].map((_, index) =>
              Time.push(ini - 10 * (dataLength - index))
            );
            dataCh["Time"] = Time;
            this.client.get("BUFFER", (err, dataBuffer) => {
              let queData = JSON.parse(dataBuffer);
              queData["Time"] = [...queData["Time"], ...dataCh["Time"]];
              arrayJSON[0].channel.map((_, index) => {
                queData[index] = [...queData[index], ...dataCh[index]];
              });
              let queLength = queData.Time.length;
              let HighChartData = {
                series1: [],
                series2: [],
                series3: [],
                series4: [],
                series5: [],
                series6: []
              };
              if (queLength >= duration) {
                queData["Time"] = queData["Time"].slice(
                  queLength - duration - 1,
                  queLength - 1
                );
                arrayJSON[0].channel.map((_, index) => {
                  queData[index] = queData[index].slice(
                    queLength - duration - 1,
                    queLength - 1
                  );
                });
              }
              this.client.get("DAQDETREND", (err, trendData) => {
                let detrendData = JSON.parse(trendData);

                arrayJSON[0].channel.map((_, index) => {
                  detrendData.Time.map((val, i) => {
                    HighChartData[`series${index + 1}`].push([
                      val,
                      detrendData[index][i]
                    ]);
                  });
                });

                this.client.set(`${stackKey}`, JSON.stringify(HighChartData));
              });
              this.client.set("BUFFER", JSON.stringify(queData));
              this.client.set("DAQRT2", JSON.stringify(dataCh));
            });
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = redisHandler;
