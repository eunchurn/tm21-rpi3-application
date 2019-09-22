const Parser = require("binary-parser").Parser;

const parser = new Parser()
  .uint32be("header")
  .int8("noCh")
  .int8("noSample")
  .int8("samplingRate")
  .int8("station")
  .array("channel", {
    type: new Parser().array("data", {
      type: "doublebe",
      length: 20
    }),
    length: "noCh"
  });

export const dataParse = data => (parsedData = parser.parse(data));
