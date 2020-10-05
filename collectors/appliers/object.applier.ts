import { StreamCollectorApplier } from "./abstract.applier";
import { StreamObjectCollector, Object } from "../object.collector";

export class StreamObjectCollectorApplier<T> extends StreamCollectorApplier<Object<T>> {

  public async collect(collector: StreamObjectCollector, values: any): Promise<Object<T>> {
    const result: Object<T> = {};

    for (const value of values) {
      result[value as any] = await collector.valueGenerator(value);
    }

    return result;
  }

}