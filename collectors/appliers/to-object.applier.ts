import { Object } from "../../shared/object";
import { StreamCollectorApplier } from "./abstract.applier";
import { StreamToObjectCollector } from "../to-object.collector";

export class StreamToObjectCollectorApplier<T> extends StreamCollectorApplier<Object<T>> {

  public async collect(collector: StreamToObjectCollector, values: any): Promise<Object<T>> {
    const result: Object<T> = {};

    for (const value of values) {
      result[value as any] = await collector.valueGenerator(value);
    }

    return result;
  }

}