import { StreamMapOperation } from "../map.operation";
import { StreamOperationApplier } from "./abstract.applier";

export class StreamMapOperationApplier extends StreamOperationApplier {

  public async apply(operation: StreamMapOperation, values: any): Promise<any[]> {
    const mapped: any[] = [];

    for (const value of await values) {
      mapped.push(await operation.mapper(value));
    }

    return mapped;
  }

}