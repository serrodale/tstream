import { StreamSumCollector } from "../sum.collector";
import { StreamCollectorApplier } from "./abstract.applier";

export class StreamSumCollectorApplier extends StreamCollectorApplier<number> {

  public async collect(_: StreamSumCollector, values: any): Promise<number> {
    let sum = 0;
    
    for (const value of await values) {
      sum += value;
    }

    return sum;
  }

}