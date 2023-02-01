import { omit } from '../object';

describe('omitting object fields', () => {
  it('should remove 1 field', () => {
    const incomingObj = { a: 1, b: '' };
    const outcomingObj = { a: 1 };

    expect(omit(incomingObj, ['b'])).toStrictEqual(outcomingObj);
  });

  it('should remove all fields', () => {
    const incomingObj = { a: 1, b: '' };
    expect(omit(incomingObj, ['a', 'b'])).toStrictEqual({});
  });

  it('should not remove any fields', () => {
    const incomingObj = { a: 1, b: '' };
    expect(omit(incomingObj, [])).toStrictEqual(incomingObj);
  });
});
