import { StreamOperation } from "operations/operation";

export abstract class StreamOperationApplier {

  public abstract apply(operation: StreamOperation, values: any): any;

}
