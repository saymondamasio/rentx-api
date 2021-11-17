import { EntityRepository, getMongoRepository, MongoRepository } from 'typeorm'

import { ICreateNotificationDTO } from '@modules/notifications/dtos/ICreateNotificationDTO'
import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository'

import { Notification } from '../schemas/Notification'

@EntityRepository(Notification)
export class NotificationsRepository implements INotificationsRepository {
  private repository: MongoRepository<Notification>

  constructor() {
    this.repository = getMongoRepository(Notification, 'mongo')
  }

  async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.repository.create({
      content,
      recipient_id,
    })

    await this.repository.save(notification)

    return notification
  }
}
