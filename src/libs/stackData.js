import "dotenv/config";
import redis from "redis";

const client = redis.createClient();

// @flow
export const addData = (key: string, data: string) => {
  client.zadd(key, new Date().valueOf(), JSON.stringify(data));
};

export const stackPLC = (key: string) => {
  return new Promise((resolve, reject) => {
    try {
      client.zrange(key, 0, -1, (err, data) => {
        if (err) throw err;
        client.del(key);
        const stackedData = {};
        const arrayJSON = data.map(str => JSON.parse(str));
        stackedData.timestamp = new Date().valueOf();
        stackedData.index = [].concat(
          ...arrayJSON.map(val => val.data.map(item => item.index)),
        );
        stackedData.Y1 = [].concat(
          ...arrayJSON.map(val => val.data.map(item => item.Y1)),
        );
        stackedData.Y2 = [].concat(
          ...arrayJSON.map(val => val.data.map(item => item.Y2)),
        );
        stackedData.X1 = [].concat(
          ...arrayJSON.map(val => val.data.map(item => item.X1)),
        );
        stackedData.motorSpeed = [].concat(
          ...arrayJSON.map(val =>
            val.data.map(item => item.motorSpeed),
          ),
        );
        stackedData.dispH = [].concat(
          ...arrayJSON.map(val => val.data.map(item => item.dispH)),
        );
        stackedData.dispL = [].concat(
          ...arrayJSON.map(val => val.data.map(item => item.dispL)),
        );
        stackedData.motorVoltage = [].concat(
          ...arrayJSON.map(val =>
            val.data.map(item => item.motorVoltage),
          ),
        );
        stackedData.Y1filter = [].concat(
          ...arrayJSON.map(val =>
            val.data.map(item => item.Y1filter),
          ),
        );
        stackedData.Y2filter = [].concat(
          ...arrayJSON.map(val =>
            val.data.map(item => item.Y2filter),
          ),
        );
        stackedData.inverseF = [].concat(
          ...arrayJSON.map(val =>
            val.data.map(item => item.inverseF),
          ),
        );
        resolve(stackedData);
      });
    } catch (error) {
      reject(error);
    }
  });
};
