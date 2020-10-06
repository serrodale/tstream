import { StreamCollectorType } from "./collector-type";

export interface StreamToObjectCollector {
  type: StreamCollectorType.TO_OBJECT;
  valueGenerator: (key: any) => any;
}