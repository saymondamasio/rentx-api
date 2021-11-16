export interface IDateProvider {
  differenceInDays(start_date: Date, end_date: Date): number
  differenceInHours(start_date: Date, end_date: Date): number
  utcToLocal(date: Date): Date
  addDays(date: Date, days: number): Date
}
