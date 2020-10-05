import { StreamSumCollector } from "./sum.collector";
import { StreamObjectCollector } from "./object.collector";
import { StreamGroupByCollector } from "./group-by.collector";
import { StreamFirstMatchCollector } from "./first-match.collector";

export type StreamCollector = 
  | StreamSumCollector
  | StreamObjectCollector
  | StreamGroupByCollector
  | StreamFirstMatchCollector;
