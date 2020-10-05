import { StreamOperation } from "./operation";
import { StreamOperationType } from "./operation-type";

import { StreamOperationApplier } from "./appliers/abstract.applier";
import { StreamMapOperationApplier } from "./appliers/map.applier";
import { StreamFilterOperationApplier } from "./appliers/filter.applier";
import { StreamUniqueOperationApplier } from "./appliers/unique.applier";
import { StreamPeekOnceOperationApplier } from "./appliers/peek-once.applier";
import { StreamPeekForEachOperationApplier } from "./appliers/peek-for-each.applier";

export abstract class StreamOperationApplierGetter {

  public static get(operation: StreamOperation): StreamOperationApplier {
    switch (operation.type) {
      case StreamOperationType.MAP: return new StreamMapOperationApplier();
      case StreamOperationType.FILTER: return new StreamFilterOperationApplier();
      case StreamOperationType.UNIQUE: return new StreamUniqueOperationApplier();
      case StreamOperationType.PEEK_ONCE: return new StreamPeekOnceOperationApplier();
      case StreamOperationType.PEEK_FOR_EACH: return new StreamPeekForEachOperationApplier();
    }
  }

}
