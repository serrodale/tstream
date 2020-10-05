import { StreamFilterOperation } from "../filter.operation";
import { StreamOperationApplier } from "./abstract.applier";

export class StreamFilterOperationApplier extends StreamOperationApplier {

  public async apply(operation: StreamFilterOperation, values: any): Promise<any> {
    const filtered: any[] = [];

    for (const value of await values) {
      if (await operation.filter(value)) {
        filtered.push(value);
      } 
    }

    return filtered;
  }

}