import { AsyncValue } from "shared/async-value";
import { StreamOperationType } from "./operation-type";

export interface StreamFirstMatchOperation {
  type: StreamOperationType.FIRST_MATCH;
  matcher: (value: any) => AsyncValue<boolean>;
}