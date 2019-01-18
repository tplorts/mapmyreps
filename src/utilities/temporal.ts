import moment, { DurationInputArg2 as DurationUnit } from 'moment';

const cssDurationRegex = /^(\d+)(\w+)$/;

export function getMillisecondsForCSSDuration(duration: string, defaultValue = 0) {
  if (!cssDurationRegex.test(duration)) {
    return defaultValue;
  }

  const [, amount, unitString] = duration.match(cssDurationRegex);
  const unit = unitString as DurationUnit;

  return moment.duration(parseFloat(amount), unit).asMilliseconds();
}

export function pause(durationMilliseconds: number) {
  return new Promise(resolve => {
    window.setTimeout(resolve, durationMilliseconds);
  });
}
