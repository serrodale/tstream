import { StreamMapOperation } from "operations/map.operation";
import { StreamOperationApplier } from "./applier";

export class StreamSumOperationApplier extends StreamOperationApplier {

  public async apply(_: StreamMapOperation, values: any): Promise<any> {
    let sum = 0;
    
    for (const value of await values) {
      sum += value;
    }

    return sum;
  }

}