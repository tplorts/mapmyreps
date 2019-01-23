export const DATE_STRING_FORMAT = 'YYYY-MM-DD';
export type DateString = string;

export interface DatePeriod {
  start?: DateString;
  end?: DateString;
}
