const Parser = require("binary-parser").Parser;

const dataParser = new Parser()
  .int16le("index")
  .int16le("index2")
  .int16le("Y1")
  .int16le("Y2")
  .int16le("X1")
  .int16le("motorSpeed")
  .int16le("dispH")
  .int16le("dispL")
  .int16le("motorVoltage")
  .int16le("Y1filter")
  .int16le("Y2filter")
  .int16le("inverseF");

const serverDataParser = new Parser()
  .uint16("index")
  .uint16("index2")
  .uint16("Y1_AI1")
  .uint16("Y2_AI2")
  .uint16("X1_AI6")
  .uint16("Y1AMD_AI4")
  .uint16("dispH")
  .uint16("dispL")
  .uint16("motorVoltage")
  .uint16("Y2Filter")
  .uint16("feedback_AI5")
  .uint16("inverse")
  .uint16("Digit1")
  .uint16("Digit2")
  .uint16("Digit3")
  .uint16("Digit4")
  .uint16("Digit5");

const plcParser = new Parser()
  .array("header", {
    type: "uint8",
    length: 26
  })
  .uint32le("fullSignal")
  .array("data", {
    type: dataParser,
    length: 20
  })
  .array("remain", {
    type: "uint16le",
    length: 4
  });

const serverParser = new Parser()
  .array("header", {
    type: "uint8",
    length: 26,
    formatter: arr => {
      return arr.map(x => x.toString(16)).join("");
    }
  })
  .array("data", {
    type: serverDataParser,
    length: 10
  });

const daqParser = new Parser()
  .uint32be("header")
  .int8("noCh")
  .int8("noSample")
  .int8("samplingRate")
  .int8("station")
  .array("channel", {
    type: new Parser().array("data", {
      type: "doublebe",
      length: 100
    }),
    length: "noCh"
  });

const anemoParser = new Parser()
  .uint16("utc")
  .string("comma1", {
    length: 1
  })
  .string("direction", {
    length: 3
  })
  .string("comma2", {
    length: 1
  })
  .string("speed", {
    length: 6
  })
  .string("comma3", {
    length: 1
  })
  .string("M", {
    length: 1
  })
  .string("comma4", {
    length: 1
  })
  .string("status", {
    length: 2
  })
  .string("comma5", {
    length: 1
  })
  .string("unknwon", {
    length: 4
  })
  .string("etx", {
    length: 1
  });

export const daqParse = data => daqParser.parse(data);
export const plcParse = data => plcParser.parse(data);
export const anemoParse = data => anemoParser.parse(data);