export function district(district: number): string {
  if (district > 0) {
    return ordinal(district);
  }

  if (district === 0) {
    return 'At Large';
  }

  return 'Unknown';
}

const ordinalSuperscripts = ['th', 'st', 'nd', 'rd'];

export function ordinal(numericValue: number): string {
  const tens = numericValue % 100;

  const superscript =
    ordinalSuperscripts[(tens - 20) % 10] ||
    ordinalSuperscripts[tens] ||
    ordinalSuperscripts[0];

  return numericValue + superscript;
}
