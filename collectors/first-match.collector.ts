import { AsyncValue } from "../shared/async-value";
import { StreamCollectorType } from "./collector-type";

export interface StreamFirstMatchCollector {
  type: StreamCollectorType.FIRST_MATCH;
  matcher: (key: any) => AsyncValue<boolean>;
}
