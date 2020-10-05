import { StreamMapOperation } from "./map.operation";
import { StreamSumOperation } from "./sum.operation";
import { StreamUniqueOperation } from "./unique.operation";
import { StreamFilterOperation } from "./filter.operation";
import { StreamFirstMatchOperation } from "./first-match.operation";

export type StreamOperation = 
  | StreamMapOperation
  | StreamSumOperation
  | StreamFilterOperation
  | StreamUniqueOperation
  | StreamFirstMatchOperation;