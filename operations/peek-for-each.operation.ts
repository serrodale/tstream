import { StreamOperationType } from "./operation-type";

export interface StreamPeekForEachOperation {
  type: StreamOperationType.PEEK_FOR_EACH;
  peeker: (value: any) => void;
}