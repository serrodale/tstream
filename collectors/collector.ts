import { StreamSumCollector } from "./to-sum.collector";
import { StreamToSetCollector } from "./to-set.collector";
import { StreamGroupByCollector } from "./to-group-by.collector";
import { StreamToObjectCollector } from "./to-object.collector";
import { StreamFirstMatchCollector } from "./to-first-match.collector";
import { StreamPartitionByCollector } from "./to-partition-by.collector";

export type StreamCollector = 
  | StreamSumCollector
  | StreamToSetCollector
  | StreamGroupByCollector
  | StreamToObjectCollector
  | StreamFirstMatchCollector
  | StreamPartitionByCollector;
