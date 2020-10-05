import { StreamPeekOnceOperation } from "operations/peek-once.operation";
import { StreamOperationApplier } from "./applier";

export class StreamPeekOnceOperationApplier extends StreamOperationApplier {

  public async apply(operation: StreamPeekOnceOperation, values: any): Promise<any[]> {
    operation.peeker(values);

    return values;
  }

}