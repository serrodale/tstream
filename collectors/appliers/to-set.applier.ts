import { StreamToSetCollector } from "../to-set.collector";
import { StreamCollectorApplier } from "./abstract.applier";

export class StreamToSetCollectorApplier<T> extends StreamCollectorApplier<Set<T>> {

  public async collect(_: StreamToSetCollector, values: any): Promise<Set<T>> {
    const set = new Set<T>();

    for (const value of values) {
      set.add(value);
    }

    return set;
  }

}