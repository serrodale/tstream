import { StreamCollectorType } from "./collector-type";

import { StreamCollectorApplier } from "./appliers/abstract.applier";
import { StreamToSumCollectorApplier } from "./appliers/to-sum.applier";
import { StreamToSetCollectorApplier } from "./appliers/to-set.applier";
import { StreamToObjectCollectorApplier } from "./appliers/to-object.applier";
import { StreamToGroupByCollectorApplier } from "./appliers/to-group-by.applier";
import { StreamToFirstMatchCollectorApplier } from "./appliers/to-first-match.applier";
import { StreamToPartitionByCollectorApplier } from "./appliers/to-partition-by.applier";

export abstract class StreamCollectorApplierGetter {

  public static get(type: StreamCollectorType): StreamCollectorApplier<any> {
    switch (type) {
      case StreamCollectorType.TO_SUM: return new StreamToSumCollectorApplier();
      case StreamCollectorType.TO_SET: return new StreamToSetCollectorApplier();
      case StreamCollectorType.TO_OBJECT: return new StreamToObjectCollectorApplier();
      case StreamCollectorType.TO_GROUP_BY: return new StreamToGroupByCollectorApplier();
      case StreamCollectorType.TO_FIRST_MATCH: return new StreamToFirstMatchCollectorApplier();
      case StreamCollectorType.TO_PARTITION_BY: return new StreamToPartitionByCollectorApplier();
    }
  }

}
