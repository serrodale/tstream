import { Stream } from '.';

const getValuesFromDB = (): Promise<number[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([1, 2, 2, 4]);
    }, 1000);
  });
};

const filterEvenNumbers = (x: number): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x % 2 === 0);
    }, 1000);
  });
};

const main = async () => {
  const output = await Stream
    .of(getValuesFromDB())
    .map(x => x * 2)
    .filter(filterEvenNumbers)
    .unique()
    .toList();

  console.log(output);
};

main();
