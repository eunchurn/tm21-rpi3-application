import "dotenv/config";
import redis from "redis";

interface SingleData {
  data: {
    index: number;
    Y1: number;
    Y2: number;
    X1: number;
    motorSpeed: number;
    dispH: number;
    dispL: number;
    motorVoltage: number;
    Y1filter: number;
    Y2filter: number;
    inverseF: number;
  }[];
}
interface StackData {
  timestamp: number;
  index: number[];
  Y1: number[];
  Y2: number[];
  X1: number[];
  motorSpeed: number[];
  dispH: number[];
  dispL: number[];
  motorVoltage: number[];
  Y1filter: number[];
  Y2filter: number[];
  inverseF: number[];
}

const client = redis.createClient();

export const addData = (key: string, data: string): void => {
  client.zadd(key, new Date().valueOf(), JSON.stringify(data));
};

export const stackPLC = (key: string): Promise<StackData> => {
  return new Promise<StackData>((resolve, reject) => {
    try {
      client.zrange(key, 0, -1, (err, data) => {
        if (err) throw err;
        client.del(key);
        // const stackedData = {};
        const arrayJSON = data.map((str) =>
          JSON.parse(str),
        ) as SingleData[];
        const timestamp = new Date().valueOf();
        const index = new Array<number>().concat(
          ...arrayJSON.map((val) =>
            val.data.map((item) => item.index),
          ),
        );
        const Y1 = new Array<number>().concat(
          ...arrayJSON.map((val) => val.data.map((item) => item.Y1)),
        );
        const Y2 = new Array<number>().concat(
          ...arrayJSON.map((val) => val.data.map((item) => item.Y2)),
        );
        const X1 = new Array<number>().concat(
          ...arrayJSON.map((val) => val.data.map((item) => item.X1)),
        );
        const motorSpeed = new Array<number>().concat(
          ...arrayJSON.map((val) =>
            val.data.map((item) => item.motorSpeed),
          ),
        );
        const dispH = new Array<number>().concat(
          ...arrayJSON.map((val) =>
            val.data.map((item) => item.dispH),
          ),
        );
        const dispL = new Array<number>().concat(
          ...arrayJSON.map((val) =>
            val.data.map((item) => item.dispL),
          ),
        );
        const motorVoltage = new Array<number>().concat(
          ...arrayJSON.map((val) =>
            val.data.map((item) => item.motorVoltage),
          ),
        );
        const Y1filter = new Array<number>().concat(
          ...arrayJSON.map((val) =>
            val.data.map((item) => item.Y1filter),
          ),
        );
        const Y2filter = new Array<number>().concat(
          ...arrayJSON.map((val) =>
            val.data.map((item) => item.Y2filter),
          ),
        );
        const inverseF = new Array<number>().concat(
          ...arrayJSON.map((val) =>
            val.data.map((item) => item.inverseF),
          ),
        );
        const stackedData = {
          timestamp,
          index,
          Y1,
          Y2,
          X1,
          motorSpeed,
          dispH,
          dispL,
          motorVoltage,
          Y1filter,
          Y2filter,
          inverseF,
        };
        resolve(stackedData);
      });
    } catch (error) {
      reject(new Error(JSON.stringify(error)));
    }
  });
};
