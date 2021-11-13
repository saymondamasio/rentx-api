import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

export class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = dayjs(start_date).utc()
    const end_date_utc = dayjs(end_date).utc()
    return dayjs(end_date_utc).diff(dayjs(start_date_utc), 'hours')
  }
}
