import { StreamOperationApplier } from "./applier";
import { StreamPeekForEachOperation } from "operations/peek-for-each.operation";

export class StreamPeekForEachOperationApplier extends StreamOperationApplier {

  public async apply(operation: StreamPeekForEachOperation, values: any): Promise<any[]> {
    for (const value of await values) {
      operation.peeker(value);
    }

    return values;
  }

}