import { StreamOperationType } from "./operation-type";

export interface StreamMapOperation {
  type: StreamOperationType.MAP;
  mapper: (value: any) => any;
}