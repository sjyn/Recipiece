export function nou(entity): boolean {
  return entity === null || entity === undefined;
}

export function fractionToDecimal(input: string): number {
  if (input.indexOf('/') != -1) {
    const parts = input.split(' ');
    let decParts;
    if (parts.length > 1) {
      decParts = parts[1].split('/');
    } else {
      decParts = parts[0].split('/');
      parts[0] = '0';
    }
    return parseInt(parts[0], 10) + (parseInt(decParts[0], 10) / parseInt(decParts[1], 10));
  } else {
    return +input;
  }
}
