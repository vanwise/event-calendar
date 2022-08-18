type ConditionalStrings = Record<string, unknown>;
type IncomingString = string | undefined | null | ConditionalStrings;

export function concatStringsBySpace(...strings: IncomingString[]): string {
  const concattedString = strings.reduce((acc: string, string) => {
    if (!string) return acc;

    return typeof string === 'string'
      ? getStringsJoinedBySpace(acc, string)
      : getJoinedConditionalStrings(acc, string);
  }, '');

  function getJoinedConditionalStrings(
    oldString: string,
    conditionalStrings: ConditionalStrings,
  ) {
    return Object.keys(conditionalStrings).reduce((stringAcc, stringKey) => {
      const expression = conditionalStrings[stringKey];
      return expression
        ? getStringsJoinedBySpace(stringAcc, stringKey)
        : stringAcc;
    }, oldString);
  }

  function getStringsJoinedBySpace(acc: string, newString: string) {
    return acc + (acc ? ' ' : '') + newString;
  }

  return concattedString;
}
