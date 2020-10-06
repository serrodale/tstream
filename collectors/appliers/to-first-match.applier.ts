import { StreamCollectorApplier } from "./abstract.applier";
import { StreamToFirstMatchCollector } from "../to-first-match.collector";

export class StreamToFirstMatchCollectorApplier extends StreamCollectorApplier<number> {

  public async collect(collector: StreamToFirstMatchCollector, values: any): Promise<number> {
    for (const value of values) {
      if (await collector.matcher(value)) {
        return value;
      }
    }

    return null;
  }

}