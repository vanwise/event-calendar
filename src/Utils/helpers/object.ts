export function omit<
  Obj extends Record<string, any>,
  Keys extends readonly (keyof Obj)[],
>(object: Obj, excludedKeys: Keys): Omit<Obj, Keys[number]> {
  const includedKeys = Object.keys(object).filter(
    key => !excludedKeys.includes(key),
  ) as Exclude<keyof Obj, Keys[number]>[];

  return Object.fromEntries(
    includedKeys.map(key => [key, object[key]]),
  ) as Omit<Obj, Keys[number]>;
}
