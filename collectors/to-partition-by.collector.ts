import { AsyncValue } from "../shared/async-value";
import { StreamCollectorType } from "./collector-type";

export interface StreamToPartitionByCollector {
  type: StreamCollectorType.TO_PARTITION_BY;
  partitioner: (value: any) => AsyncValue<boolean>;
}
