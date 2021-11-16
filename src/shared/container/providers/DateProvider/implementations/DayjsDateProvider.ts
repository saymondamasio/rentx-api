import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {
  compareIfBefore(date: Date, date_compare: Date): boolean {
    return dayjs(date).isBefore(dayjs(date_compare).utc().local().toDate())
  }

  addDays(date: Date, days: number): Date {
    return dayjs(date).add(days, 'days').utc().local().toDate()
  }

  addHours(date: Date, hours: number): Date {
    return dayjs(date).add(hours, 'hours').utc().local().toDate()
  }
  differenceInDays(start_date: Date, end_date: Date): number {
    const start_date_utc = dayjs(start_date).utc().local().format()
    const end_date_utc = dayjs(end_date).utc().local().format()

    return dayjs(end_date_utc).diff(dayjs(start_date_utc), 'days')
  }

  differenceInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = dayjs(start_date).utc().local().format()
    const end_date_utc = dayjs(end_date).utc().local().format()

    return dayjs(end_date_utc).diff(dayjs(start_date_utc), 'hours')
  }

  utcToLocal(date: Date): Date {
    return dayjs(date).utc().local().toDate()
  }
}
