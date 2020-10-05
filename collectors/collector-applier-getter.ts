import { StreamCollectorType } from "./collector-type";

import { StreamCollectorApplier } from "./appliers/abstract.applier";
import { StreamSumCollectorApplier } from "./appliers/sum.applier";
import { StreamObjectCollectorApplier } from "./appliers/object.applier";
import { StreamGroupByCollectorApplier } from "./appliers/group-by.applier";
import { StreamFirstMatchCollectorApplier } from "./appliers/first-match.applier";

export abstract class StreamCollectorApplierGetter {

  public static get(type: StreamCollectorType): StreamCollectorApplier<any> {
    switch (type) {
      case StreamCollectorType.SUM: return new StreamSumCollectorApplier();
      case StreamCollectorType.OBJECT: return new StreamObjectCollectorApplier();
      case StreamCollectorType.GROUP_BY: return new StreamGroupByCollectorApplier();
      case StreamCollectorType.FIRST_MATCH: return new StreamFirstMatchCollectorApplier();
    }
  }

}
