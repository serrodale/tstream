enum StreamOperationType {
  MAP,
  SUM,
  FILTER,
  UNIQUE,
}

type AsyncValue<T> = Promise<T> | T;
type AsyncValues<T> = Promise<T[]> | T[];

type StreamOperation = 
  | StreamMapOperation
  | StreamSumOperation
  | StreamFilterOperation
  | StreamUniqueOperation;

interface StreamMapOperation {
  type: StreamOperationType.MAP;
  mapper: (value: any) => any;
}

interface StreamFilterOperation {
  type: StreamOperationType.FILTER;
  filter: (value: any) => AsyncValue<boolean>;
}

interface StreamSumOperation {
  type: StreamOperationType.SUM;
}

interface StreamUniqueOperation {
  type: StreamOperationType.UNIQUE;
}

interface StreamUniqueOperation {
  type: StreamOperationType.UNIQUE;
}

export class Stream<T> {

  private values: AsyncValues<T>;
  private operations: StreamOperation[];

  private constructor(values: AsyncValues<T>, operations: StreamOperation[]) {
    this.values = values;
    this.operations = operations;
  }

  public static of<T>(values: Promise<T[]>): Stream<T> {
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

  public filter(filter: (value: AsyncValue<T>) => AsyncValue<boolean>): Stream<T> {
    return this.createStream({
      type: StreamOperationType.FILTER,
      filter
    });
  }

  public async sum(): Promise<number> {
    const finalStream = this.createStream({
      type: StreamOperationType.SUM,
    });

    await finalStream.flush();
    return finalStream.values as any;
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
    }
  }

}

abstract class StreamOperationApplier {

  public abstract apply(operation: StreamOperation, values: any): any;

}

class StreamMapOperationApplier extends StreamOperationApplier {

  public async apply(operation: StreamMapOperation, values: any): Promise<any[]> {
    const mapped: any[] = [];

    for (const value of await values) {
      mapped.push(await operation.mapper(value));
    }

    return mapped;
  }

}

class StreamSumOperationApplier extends StreamOperationApplier {

  public async apply(_: StreamMapOperation, values: any): Promise<any> {
    let sum = 0;
    
    for (const value of await values) {
      sum += value;
    }

    return sum;
  }

}

class StreamFilterOperationApplier extends StreamOperationApplier {

  public async apply(operation: StreamFilterOperation, values: any): Promise<any> {
    const filtered: any[] = [];

    for (const value of await values) {
      if (await operation.filter(value)) {
        filtered.push(value);
      } 
    }

    return filtered;
  }

}

class StreamUniqueOperationApplier extends StreamOperationApplier {

  public async apply(_: StreamMapOperation, values: any): Promise<any[]> {
    const unique: any[] = [];
    const seenSoFar: any = {};

    for (const value of await values) {
      if (!seenSoFar[value]) {
        seenSoFar[value] = true;
        unique.push(value);
      }
    }

    return unique;
  }

}
