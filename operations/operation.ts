import { StreamMapOperation } from "./map.operation";
import { StreamFilterOperation } from "./filter.operation";
import { StreamUniqueOperation } from "./unique.operation";
import { StreamFlatMapOperation } from "./flat-map.operation";
import { StreamPopulateOperation } from "./populate.operation";
import { StreamPeekOnceOperation } from "./peek-once.operation";
import { StreamPeekForEachOperation } from "./peek-for-each.operation";

export type StreamOperation = 
  | StreamMapOperation
  | StreamFilterOperation
  | StreamUniqueOperation
  | StreamFlatMapOperation
  | StreamPopulateOperation
  | StreamPeekOnceOperation
  | StreamPeekForEachOperation;
