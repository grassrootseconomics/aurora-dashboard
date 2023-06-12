export function calculateAverage(numbers: number[]): number | null {
    if (numbers.length == 0) return null;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;
    return +average.toFixed(2);
}

export function calculateWeightedAverage(data: {value: number, weight: number}[]): number {
    const sumOfProducts = data.reduce((acc, point) => acc + (point.value * point.weight), 0);
    const sumOfWeights = data.reduce((acc, point) => acc + point.weight, 0);
    const weightedAverage = sumOfProducts / sumOfWeights;
    return +weightedAverage.toFixed(2);
}

export function formatArrayPercentage(arr: string[]): string {
    const counts: { [key: string]: number } = {};
    const total = arr.length;

    if(!total) return "";
  
    // Count the occurrences of each value in the array
    for (const value of arr) {
      counts[value] = (counts[value] || 0) + 1;
    }
  
    // Calculate the percentage and format the result
    const percentages = Object.entries(counts).map(([value, count]) => {
      const percentage = (count / total) * 100;
      return `${value}: ${percentage.toFixed(2)}%`;
    });
  
    // Join the percentages into a single string
    return percentages.join(', ');
  }
  