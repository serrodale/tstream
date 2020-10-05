import { StreamOperationType } from "./operation-type";

export interface StreamFlatMapOperation {
  type: StreamOperationType.FLAT_MAP;
  mapper: (value: any) => any[];
}