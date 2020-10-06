import { AsyncValue } from "../shared/async-value";
import { StreamCollectorType } from "./collector-type";

export interface StreamPartitionByCollector {
  type: StreamCollectorType.PARTITION_BY;
  partitioner: (value: any) => AsyncValue<boolean>;
}
