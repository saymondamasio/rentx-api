export interface IDateProvider {
  compareIfBefore(date: Date, date_compare: Date): boolean
  differenceInDays(start_date: Date, end_date: Date): number
  differenceInHours(start_date: Date, end_date: Date): number
  utcToLocal(date: Date): Date
  addDays(date: Date, days: number): Date
  addHours(date: Date, hours: number): Date
}
