import { ObjectKey } from "./shared/object";
import { AsyncValues, AsyncValue } from "./shared/async-value";

import { StreamOperation } from "./operations/operation";
import { StreamOperationType } from "./operations/operation-type";
import { StreamOperationApplierGetter } from "./operations/operation-applier-getter";

import { StreamCollector } from "./collectors/collector";
import { StreamCollectorType } from "./collectors/collector-type";
import { StreamCollectorApplierGetter } from "./collectors/collector-applier-getter";

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
      mapper,
    });
  }

  public flatMap<U>(mapper: (value: T) => U[]): Stream<U> {
    return this.createStream<U>({
      type: StreamOperationType.FLAT_MAP,
      mapper,
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

  public populate(populator: (values: T[]) => AsyncValues<T>): Stream<T> {
    return this.createStream({
      type: StreamOperationType.POPULATE,
      populator
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

  public filter(
    filter: (value: AsyncValue<T>) => AsyncValue<boolean>
  ): Stream<T> {
    return this.createStream({
      type: StreamOperationType.FILTER,
      filter
    });
  }

  public async firstMatch(
    matcher: (value: T) => AsyncValue<boolean>
  ): Promise<T> | null {
    return this.applyCollector({
      type: StreamCollectorType.FIRST_MATCH,
      matcher
    });
  }

  public async sum(): Promise<number> {
    return this.applyCollector({
      type: StreamCollectorType.SUM
    });
  }

  private async applyCollector(collector: StreamCollector): Promise<any> {
    await this.applyOperations();

    return StreamCollectorApplierGetter
      .get(collector.type)
      .collect(collector, this.values);
  }

  public async toList(): Promise<T[]> {
    await this.applyOperations();
    return this.values;
  }

  public async toObject<U>(
    valueGenerator: (key: T) => AsyncValue<U>
  ): Promise<Record<ObjectKey, U>> {
    return this.applyCollector({
      type: StreamCollectorType.OBJECT,
      valueGenerator
    });
  }

  public async groupBy(
    grouper: (value: T) => AsyncValue<ObjectKey>
  ): Promise<Record<ObjectKey, T[]>> {
    return this.applyCollector({
      type: StreamCollectorType.GROUP_BY,
      grouper
    });
  }

  public async partitionBy(
    partitioner: (value: T) => AsyncValue<boolean>
  ): Promise<Record<ObjectKey, T[]>> {
    return this.applyCollector({
      type: StreamCollectorType.PARTITION_BY,
      partitioner
    });
  }

  private async applyOperations(): Promise<any[]> {
    for (const operation of this.operations) {
      this.values = await StreamOperationApplierGetter
        .get(operation)
        .apply(operation, this.values);
    }

    return this.values;
  }

}
