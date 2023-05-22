export function createColorScaleGenerator(formatter: (value: string) => string) {
  return (name: string): object =>
    Object.fromEntries(
      Array.from({ length: 12 }, (_, index) => {
        const key = index + 1;
        return [key, formatter(`var(--${name}${key})`)];
      })
    );
}