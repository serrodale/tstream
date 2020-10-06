import { Object, ObjectKey } from "../../shared/object";
import { StreamCollectorApplier } from "./abstract.applier";
import { StreamToGroupByCollector } from "collectors/to-group-by.collector";

export class StreamToGroupByCollectorApplier<T> extends StreamCollectorApplier<Object<T[]>> {

  public async collect(collector: StreamToGroupByCollector, values: any): Promise<Object<T[]>> {
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