export let years: number[] = new Array(5).fill(0);
years = years.map((year: number, index: number) => {
  let currentYear = new Date().getFullYear();
  return currentYear - index;
});
export let seasons: string[] = ["summer", "fall", "winter"];
