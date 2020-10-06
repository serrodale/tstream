import { Object } from "../../shared/object";
import { StreamCollectorApplier } from "./abstract.applier";
import { StreamToPartitionByCollector } from "collectors/to-partition-by.collector";

export class StreamToPartitionByCollectorApplier<T> extends StreamCollectorApplier<Object<T[]>> {

  public async collect(collector: StreamToPartitionByCollector, values: any): Promise<Object<T[]>> {
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