import { Stream } from '.';

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
    .map(x => x + 5)
    .peekOnce(console.log)
    .populate(() => [1, 2, 4])
    .filter(isEven)
    .flatMap(x => [x + 1, x + 5, x + 9])
    .peekForEach(console.log)
    .unique()
    .firstMatch(isGreaterThan(5));

  console.log(output);
};

main();