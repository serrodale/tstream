import { ObjectKey } from "../shared/object";
import { AsyncValue } from "../shared/async-value";
import { StreamCollectorType } from "./collector-type";

export interface StreamGroupByCollector {
  type: StreamCollectorType.GROUP_BY;
  grouper: (value: any) => AsyncValue<ObjectKey>;
}
