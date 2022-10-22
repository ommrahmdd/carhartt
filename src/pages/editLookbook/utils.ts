export let years: number[] = new Array(10).fill(0);
years = years.map((year: number, index: number) => {
  let currentYear = new Date().getFullYear() + 1;
  return currentYear - index;
});
export let seasons: string[] = ["summer", "fall", "winter"];
