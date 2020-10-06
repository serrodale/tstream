import { Object, ObjectKey } from "../../shared/object";
import { StreamCollectorApplier } from "./abstract.applier";
import { StreamPartitionByCollector } from "collectors/partition-by.collector";

export class StreamPartitionByCollectorApplier<T> extends StreamCollectorApplier<Object<T[]>> {

  public async collect(collector: StreamPartitionByCollector, values: any): Promise<Object<T[]>> {
    const result: Object<T[]> = {
      true: [],
      false: []
    };

    for (const value of values) {
      const key = await collector.partitioner(value);
      result[key as any] = result[key as any].concat(value);
    }

    return result;
  }

}