import { Object, ObjectKey } from "../../shared/object";
import { StreamCollectorApplier } from "./abstract.applier";
import { StreamGroupByCollector } from "collectors/group-by.collector";

export class StreamGroupByCollectorApplier<T> extends StreamCollectorApplier<Object<T[]>> {

  public async collect(collector: StreamGroupByCollector, values: any): Promise<Object<T[]>> {
    const result: Object<T[]> = {};

    for (const value of values) {
      const key: ObjectKey = await collector.grouper(value);
    
      result[key] = result[key]
        ? result[key].concat(value)
        : [value];
    }

    return result;
  }

}