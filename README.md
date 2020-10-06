## Why?

Native ES2015 JS methods for dealing with arrays do not expect neither async values nor async functions.

For example, this wouldn't have the expected behaviour as ``map`` does not ``await`` ``addOneAsync``.
So, instead of mapping the numeric values into strings, we would end up with Promises of strings:

```ts
const addOneAsync = (value: number): Promise<number> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value + 1);
    });
  });
};

const transformedValues = [1, 2, 3].map(addOneAsync);

console.log(transformedValues); // [Promise { <pending> }, Promise { <pending> }, Promise { <pending> }]
```

One way to make this work could be using the ``Promise.all`` method:

```ts
console.log(Promise.all(transformedValues)); // [2, 3, 4]
```

Not a big deal.

But, now, let's suppose we want to filter the even values out of the ones resulting from the ``map`` operation. This is when things start
to get a little bit messy.

We could start out from the last example, resulting our code in something like this:

```ts
const transformedValues = Promise.all([1, 2, 3].map(addOneAsync));
const evenValues = transformedValues.filter(isEven);
```

Which does not seem bad at all, but we are adding a lot of overhead for two basic operations on an array:

1. The promises-related stuff
2. A new variable name that is completely redundant

You could still think is not a big deal and I could agree with you, but, imagine if we concatenated way more async operations in this flow. In that scenario, it
would be very difficult to defend this approach.

Wouldn't it be better to simply do something like this?

```ts
const transformedValues = [1, 2, 3]
  .map(addOneAsync);
  .filter(isEven);
```

This issue, along with the purpose of enriching the array ES2015 methods API, are the reasons behind creating a library like this.

## The library 

TStream is a simple yet powerful library to deal with arrays without having to worry whether the values/operations are async or not.

The only overhead you will have to add to your code is the ``of()`` static method. From that point on, you can use asynchronous functions as if they
were synchronous.

## Example

```sh
$ git clone git@github.com:serrodale/tstream.git
$ npm i
$ npm example
```

```ts
import { Stream } from "tstream";

const getValuesFromDB = (): Promise<number[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([1, 2, 2, 4]);
    }, 1000);
  });
};

const isEven = (x: number): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x % 2 === 0);
    }, 1000);
  });
};

const isGreaterThan = (x: number): ((value: number) => Promise<boolean>) => {
  return (value: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(value > x);
      }, 1000);
    });
  };
};

const main = async () => {
  const output = await Stream
    .of(getValuesFromDB())
    .map(x => x * 3)
    .unique()
    .filter(isEven)
    .toFirstMatch(isGreaterThan(5));

  console.log(output); // 6
};

main();

```