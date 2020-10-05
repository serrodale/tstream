import { StreamOperationApplier } from "./abstract.applier";
import { StreamPopulateOperation } from "../populate.operation";

export class StreamPopulateOperationApplier extends StreamOperationApplier {

  public async apply(operation: StreamPopulateOperation, values: any): Promise<any[]> {
    return [...values, ...await operation.populator(values)];
  }

}