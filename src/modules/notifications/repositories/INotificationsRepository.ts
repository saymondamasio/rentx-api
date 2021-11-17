import { ICreateNotificationDTO } from '../dtos/ICreateNotificationDTO'
import { Notification } from '../infra/schemas/Notification'

export interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>
}
