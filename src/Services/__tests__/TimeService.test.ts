import { TimeService } from 'Services';

describe('Time Service', () => {
  it('should be compare to saming dates', () => {
    expect(TimeService.isDateSame('2021-04-10', '2021-04-11')).toBeFalsy();
    expect(TimeService.isDateSame('2021-04-10', '2021-04-10')).toBeTruthy();
    expect(TimeService.isDateSame('2000-04-10', '2021-04-10')).toBeFalsy();
    expect(TimeService.isDateSame('2000-04-10', '2000-04-10')).toBeTruthy();
    expect(TimeService.isDateSame('2000-04-10', '2000-05-10')).toBeFalsy();
  });

  it('should be check to dates overlapping', () => {
    expect(
      TimeService.isOverlapped(
        { from: '2021-04-10', to: '2021-04-12' },
        { from: '2021-04-11', to: '2021-04-13' },
      ),
    ).toBeTruthy();

    expect(
      TimeService.isOverlapped(
        { from: '2021-04-10', to: '2021-04-11' },
        { from: '2021-04-10', to: '2021-04-12' },
      ),
    ).toBeTruthy();

    expect(
      TimeService.isOverlapped(
        { from: '2021-04-10', to: '2021-04-12' },
        { from: '2021-04-10', to: '2021-04-12' },
      ),
    ).toBeTruthy();

    expect(
      TimeService.isOverlapped(
        { from: '2021-04-10', to: '2021-04-12' },
        { from: '2021-04-12', to: '2021-04-12' },
      ),
    ).toBeFalsy();

    expect(
      TimeService.isOverlapped(
        { from: '2021-04-10', to: '2021-04-11' },
        { from: '2021-04-11', to: '2021-04-12' },
      ),
    ).toBeFalsy();
  });

  it('should be check between dates', () => {
    expect(
      TimeService.isDateBetween(
        { from: '2021-04-10', to: '2021-04-10' },
        '2021-04-10',
      ),
    ).toBeTruthy();

    expect(
      TimeService.isDateBetween(
        { from: '2021-04-10', to: '2021-04-10' },
        '2021-04-11',
      ),
    ).toBeFalsy();

    expect(
      TimeService.isDateBetween(
        { from: '2021-04-10', to: '2021-04-11' },
        '2021-04-10',
      ),
    ).toBeTruthy();

    expect(
      TimeService.isDateBetween(
        { from: '2021-04-10', to: '2021-04-11' },
        '2021-04-09',
      ),
    ).toBeFalsy();

    expect(
      TimeService.isDateBetween(
        { from: '2021-04-10', to: '2021-11-11' },
        '2021-10-09',
      ),
    ).toBeTruthy();

    expect(
      TimeService.isDateBetween(
        { from: '2012-04-10', to: '2021-04-11' },
        '2015-10-09',
      ),
    ).toBeTruthy();
  });

  it('should be getting duration from start of date', () => {
    const date = '2021-04-10T10:00:00';

    expect(TimeService.getDurationFromStartOfDay(date, 'hours')).toBe(10);
    expect(TimeService.getDurationFromStartOfDay(date, 'minutes')).toBe(600);
  });

  it('should be adding multiple duration', () => {
    const date = TimeService.addMultiple('2021-04-10', {
      hours: 2,
      minutes: 30,
      milliseconds: 100,
    });

    expect(date.hour()).toBe(2);
    expect(date.minute()).toBe(30);
    expect(date.millisecond()).toBe(100);
  });

  it('should be getting durations between dates', () => {
    expect(
      TimeService.getDurations('2021-04-10', '2021-04-10').durationString,
    ).toBe('');
    expect(
      TimeService.getDurations('2021-04-10', '2021-04-11').durationString,
    ).toBe('1d');
    expect(
      TimeService.getDurations('2021-04-10', '2021-05-09').durationString,
    ).toBe('29d');
    expect(
      TimeService.getDurations('2021-04-10', '2021-05-10').durationString,
    ).toBe('1m');
    expect(
      TimeService.getDurations('2021-04-10', '2021-04-10T10:00:00')
        .durationString,
    ).toBe('10h');
    expect(
      TimeService.getDurations('2021-04-10', '2021-04-10T10:30:00')
        .durationString,
    ).toBe('10h 30min');
    expect(
      TimeService.getDurations('2021-04-10', '2022-06-20T05:40:00')
        .durationString,
    ).toBe('1y 2m 11d 5h 40min');
  });
});
