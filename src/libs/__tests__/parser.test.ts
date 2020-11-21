import { daqParse, plcParse, anemoParse } from "..";
import { plcBuffer, plcResult } from "./plcData";
import { daqBuffer, daqResult } from "./daqData";
import { anemoBuffer, anemoResult } from "./anemoData";

describe("parser test", () => {
  it("should parse plcData", () => {
    expect(plcParse(plcBuffer)).toEqual(plcResult);
  });
  it("should parse daqData", () => {
    expect(daqParse(daqBuffer)).toEqual(daqResult);
  });
  it("should parse anemoData", () => {
    expect(anemoParse(anemoBuffer)).toEqual(anemoResult);
  });
});
