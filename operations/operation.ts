import { StreamMapOperation } from "./map.operation";
import { StreamSumOperation } from "./sum.operation";
import { StreamUniqueOperation } from "./unique.operation";
import { StreamFilterOperation } from "./filter.operation";
import { StreamPeekOnceOperation } from "./peek-once.operation";
import { StreamFirstMatchOperation } from "./first-match.operation";
import { StreamPeekForEachOperation } from "./peek-for-each.operation";

export type StreamOperation = 
  | StreamMapOperation
  | StreamSumOperation
  | StreamFilterOperation
  | StreamUniqueOperation
  | StreamPeekOnceOperation
  | StreamFirstMatchOperation
  | StreamPeekForEachOperation;