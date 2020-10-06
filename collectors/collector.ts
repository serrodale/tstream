import { StreamSumCollector } from "./sum.collector";
import { StreamToSetCollector } from "./to-set.collector";
import { StreamGroupByCollector } from "./group-by.collector";
import { StreamToObjectCollector } from "./to-object.collector";
import { StreamFirstMatchCollector } from "./first-match.collector";
import { StreamPartitionByCollector } from "./partition-by.collector";

export type StreamCollector = 
  | StreamSumCollector
  | StreamToSetCollector
  | StreamGroupByCollector
  | StreamToObjectCollector
  | StreamFirstMatchCollector
  | StreamPartitionByCollector;
