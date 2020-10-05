import { StreamCollector } from "../collector";

export abstract class StreamCollectorApplier<T> {

  public abstract collect(collector: StreamCollector, values: any): Promise<T>;

}