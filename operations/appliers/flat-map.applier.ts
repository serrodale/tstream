import { StreamOperationApplier } from "./abstract.applier";
import { StreamFlatMapOperation } from "operations/flat-map.operation";

export class StreamFlatMapOperationApplier extends StreamOperationApplier {

  public async apply(operation: StreamFlatMapOperation, values: any): Promise<any[]> {
    const mapped: any[] = [];

    for (const value of await values) {
      mapped.push(...await operation.mapper(value));
    }

    return mapped;
  }

}