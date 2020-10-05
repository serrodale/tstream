import { AsyncValue } from "../shared/async-value";
import { StreamOperationType } from "./operation-type";

export interface StreamFilterOperation {
  type: StreamOperationType.FILTER;
  filter: (value: any) => AsyncValue<boolean>;
}