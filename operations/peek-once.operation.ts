import { StreamOperationType } from "./operation-type";

export interface StreamPeekOnceOperation {
  type: StreamOperationType.PEEK_ONCE;
  peeker: (values: any[]) => void;
}