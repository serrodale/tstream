import { StreamUniqueOperation } from "operations/unique.operation";
import { StreamOperationApplier } from "./applier";

export class StreamUniqueOperationApplier extends StreamOperationApplier {

  public async apply(_: StreamUniqueOperation, values: any): Promise<any[]> {
    const unique: any[] = [];
    const seenSoFar: any = {};

    for (const value of await values) {
      if (!seenSoFar[value]) {
        seenSoFar[value] = true;
        unique.push(value);
      }
    }

    return unique;
  }

}