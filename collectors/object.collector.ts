import { StreamCollectorType } from "./collector-type";

export interface StreamObjectCollector {
  type: StreamCollectorType.OBJECT;
  valueGenerator: (key: any) => any;
}