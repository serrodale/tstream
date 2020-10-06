import { StreamToSumCollector } from "../to-sum.collector";
import { StreamCollectorApplier } from "./abstract.applier";

export class StreamToSumCollectorApplier extends StreamCollectorApplier<number> {

  public async collect(_: StreamToSumCollector, values: any): Promise<number> {
    let sum = 0;
    
    for (const value of await values) {
      sum += value;
    }

    return sum;
  }

}