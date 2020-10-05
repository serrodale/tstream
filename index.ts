import { AsyncValues, AsyncValue } from "./shared/async-value";

import { StreamOperation } from "./operations/operation";
import { StreamOperationType } from "./operations/operation-type";

import { StreamOperationApplier } from "./appliers/applier";
import { StreamMapOperationApplier } from "./appliers/map.applier";
import { StreamSumOperationApplier } from "./appliers/sum.applier";
import { StreamFilterOperationApplier } from "./appliers/filter.applier";
import { StreamUniqueOperationApplier } from "./appliers/unique.applier";
import { StreamPeekOnceOperationApplier } from "./appliers/peek-once.applier";
import { StreamPeekForEachOperationApplier } from "./appliers/peek-for-each.applier";

export class Stream<T> {

  private values: AsyncValues<T>;
  private operations: StreamOperation[];

  private constructor(values: AsyncValues<T>, operations: StreamOperation[]) {
    this.values = values;
    this.operations = operations;
  }

  public static of<T>(values: AsyncValues<T>): Stream<T> {
    return new Stream(values, []);
  }

  public map<U>(mapper: (value: T) => U): Stream<U> {
    return this.createStream<U>({
      type: StreamOperationType.MAP,
      mapper: mapper as any,
    });
  }

  private createStream<U>(operation: StreamOperation): Stream<U> {
    return new Stream<U>(this.values as any, [
      ...this.operations,
      operation
    ]);
  }

  public unique(): Stream<T> {
    return this.createStream({
      type: StreamOperationType.UNIQUE,
    });
  }

  public peekOnce(peeker: (values: T[]) => void): Stream<T> {
    return this.createStream<T>({
      type: StreamOperationType.PEEK_ONCE,
      peeker
    });
  }

  public peekForEach(peeker: (value: T) => void): Stream<T> {
    return this.createStream<T>({
      type: StreamOperationType.PEEK_FOR_EACH,
      peeker
    });
  }

  public async firstMatch(
    matcher: (value: T) => AsyncValue<boolean>
  ): Promise<T> | null {
    await this.flush();

    for (const value of await this.values) {
      if (await matcher(value)) {
        return value;
      }
    }

    return null;
  }

  public filter(
    filter: (value: AsyncValue<T>) => AsyncValue<boolean>
  ): Stream<T> {
    return this.createStream({
      type: StreamOperationType.FILTER,
      filter
    });
  }

  public async sum(): Promise<number> {
    const finalStream = this.createStream<T>({
      type: StreamOperationType.SUM,
    });

    await finalStream.flush();
    return finalStream.values as any;
  }

  public async toList(): Promise<T[]> {
    await this.flush();
    return this.values;
  }

  public async toObject<U>(
    valueGenerator: (key: T) => AsyncValue<U>
  ): Promise<Record<string | number | symbol, U>> {
    await this.flush();
    const result: Record<string | number | symbol, U> = {};

    for (const value of await this.values) {
      result[value as any] = await valueGenerator(value);
    }

    return result;
  }

  private async flush(): Promise<any[]> {
    for (const operation of this.operations) {
      this.values = await this
        .getApplier(operation)
        .apply(operation, this.values);
    }

    return this.values;
  }

  private getApplier(operation: StreamOperation): StreamOperationApplier {
    switch (operation.type) {
      case StreamOperationType.MAP: return new StreamMapOperationApplier();
      case StreamOperationType.SUM: return new StreamSumOperationApplier();
      case StreamOperationType.FILTER: return new StreamFilterOperationApplier();
      case StreamOperationType.UNIQUE: return new StreamUniqueOperationApplier();
      case StreamOperationType.PEEK_ONCE: return new StreamPeekOnceOperationApplier();
      case StreamOperationType.PEEK_FOR_EACH: return new StreamPeekForEachOperationApplier();
    }
  }

}
