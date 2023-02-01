import { concatStringsBySpace } from '../string';

describe('concating strings by space', () => {
  test('only strings', () => {
    expect(concatStringsBySpace('first', 'second')).toBe('first second');
  });

  test('null, undefined and strings', () => {
    expect(
      concatStringsBySpace('nice string', null, undefined, 'really-string'),
    ).toBe('nice string really-string');
  });

  test('object keys', () => {
    const obj = {
      this: true,
      no: false,
      omg: ' ',
    };

    expect(concatStringsBySpace('hello', obj, 'world')).toBe(
      'hello this omg world',
    );
  });

  test('object keys with all false values', () => {
    const obj = {
      f1: false,
      f2: 0,
      f3: null,
      f4: undefined,
      f5: '',
      f6: NaN,
    };

    expect(concatStringsBySpace(obj)).toBe('');
  });
});
