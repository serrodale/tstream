import { ObjectKey } from "../shared/object";
import { AsyncValue } from "../shared/async-value";
import { StreamCollectorType } from "./collector-type";

export interface StreamToGroupByCollector {
  type: StreamCollectorType.TO_GROUP_BY;
  grouper: (value: any) => AsyncValue<ObjectKey>;
}
