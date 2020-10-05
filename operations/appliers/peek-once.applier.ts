import { StreamOperationApplier } from "./abstract.applier";
import { StreamPeekOnceOperation } from "../peek-once.operation";

export class StreamPeekOnceOperationApplier extends StreamOperationApplier {

  public async apply(operation: StreamPeekOnceOperation, values: any): Promise<any[]> {
    operation.peeker(values);

    return values;
  }

}