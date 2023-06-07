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