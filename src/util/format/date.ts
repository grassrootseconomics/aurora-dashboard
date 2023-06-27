export function calculateYearsUntilPresent(date: Date): number {
  const currentDate = new Date();
  const yearsDiff = currentDate.getFullYear() - date.getFullYear();

  // Check if the current date hasn't reached the birthdate yet in the current year
  if (
    currentDate.getMonth() < date.getMonth() ||
    (currentDate.getMonth() === date.getMonth() &&
      currentDate.getDate() < date.getDate())
  ) {
    return yearsDiff - 1;
  }

  return yearsDiff;
}

export function calculateYearsUntilPresentByYear(year: number): number {
  return new Date().getFullYear() - year;
}

export function convertToSimpleDate(isoDateString: string): string {
  if (isoDateString == null || isoDateString == '') return '';
  const dateWithTimezone = new Date(isoDateString);
  const offset = new Date(isoDateString).getTimezoneOffset() * 60000; //milliseconds
  const dateObject = new Date(dateWithTimezone.getTime() + offset);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat('es-CO', options);
  const simpleDateString = formatter.format(dateObject);

  return simpleDateString;
}

export function convertToIsoDate(simpleDate: string): Date {
  const date = new Date(
    simpleDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
  );
  return new Date(date.setDate(date.getDate() + 1));
}

export function delayToIsoDate(simpleDate: string, delay: number): Date {
  const date = new Date(
    simpleDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
  );
  return new Date(date.setDate(date.getDate() + delay - 1));
}
