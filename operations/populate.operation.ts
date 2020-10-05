import { AsyncValues } from "../shared/async-value";
import { StreamOperationType } from "./operation-type";

export interface StreamPopulateOperation {
  type: StreamOperationType.POPULATE;
  populator: (values: any[]) => AsyncValues<any>;
}