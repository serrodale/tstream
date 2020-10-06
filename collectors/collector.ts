import { StreamSumCollector } from "./sum.collector";
import { StreamToSetCollector } from "./to-set.collector";
import { StreamObjectCollector } from "./object.collector";
import { StreamGroupByCollector } from "./group-by.collector";
import { StreamFirstMatchCollector } from "./first-match.collector";
import { StreamPartitionByCollector } from "./partition-by.collector";

export type StreamCollector = 
  | StreamSumCollector
  | StreamToSetCollector
  | StreamObjectCollector
  | StreamGroupByCollector
  | StreamFirstMatchCollector
  | StreamPartitionByCollector;
