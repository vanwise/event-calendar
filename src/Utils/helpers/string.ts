type ConditionalStrings = Record<string, unknown>;
type IncomingString = string | undefined | null | ConditionalStrings;

/**
 * Separate sequence of strings by space and concat him to one string.
 * Accepts strings or a simple object.
 * @param ...strings sequence of strings
 */

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
