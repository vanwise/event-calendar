import { parseHourString } from '../date';

describe('Parse Hour String', () => {
  it('should be recieving correct string and return hour array', () => {
    expect(parseHourString('01:23')).toStrictEqual([1, 23]);
  });

  it('should be recieving uncorrect string with number and return 0 hour array', () => {
    expect(parseHourString('99:99')).toStrictEqual([0, 0]);
  });

  it('should be recieving uncorrect string with text and return 0 hour array', () => {
    expect(parseHourString('hello world')).toStrictEqual([0, 0]);
  });

  it('should be recieving undefined and return 0 hour array', () => {
    expect(parseHourString()).toStrictEqual([0, 0]);
  });
});
