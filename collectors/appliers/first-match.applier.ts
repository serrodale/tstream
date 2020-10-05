import { StreamCollectorApplier } from "./abstract.applier";
import { StreamFirstMatchCollector } from "../first-match.collector";

export class StreamFirstMatchCollectorApplier extends StreamCollectorApplier<number> {

  public async collect(collector: StreamFirstMatchCollector, values: any): Promise<number> {
    for (const value of values) {
      if (await collector.matcher(value)) {
        return value;
      }
    }

    return null;
  }

}