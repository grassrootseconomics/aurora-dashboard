/**
 *
 * Filters for the element with the highest value prop in an array.
 *
 * @param {T[]} arr Array to filter through.
 * @param {keyof T} prop Prop to filter by.
 * @returns
 */
export const filterByMaxPropValue = <T>(
  arr: T[],
  prop: keyof T
): T | undefined => {
  if (arr.length === 0) {
    return undefined;
  }

  let maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][prop] > maxElement[prop]) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};
