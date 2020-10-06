import { Stream } from ".";

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

const isOdd = (x: number): Promise<"true" | "false"> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x % 2 === 1 ? "true" : "false");
    }, 1000);
  });
} 

const main = async () => {
  const output = await Stream
    .of(getValuesFromDB())
    .map(x => x + 5)
    .peekOnce(() => console.log("before"))
    .peekForEach(console.log)
    .peekOnce(() => console.log("after"))
    .populate(() => [1, 2, 4])
    .flatMap(x => [x + 1, x + 5, x + 9])
    .unique()
    .toSet();

  console.log(output);
};

main();