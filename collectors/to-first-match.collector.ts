import { AsyncValue } from "../shared/async-value";
import { StreamCollectorType } from "./collector-type";

export interface StreamToFirstMatchCollector {
  type: StreamCollectorType.TO_FIRST_MATCH;
  matcher: (key: any) => AsyncValue<boolean>;
}
