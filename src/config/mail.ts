interface IMailConfig {
  driver: 'ethereal'

  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'saymon.damasio95@gmail.com',
      name: 'Saymon D',
    },
  },
} as IMailConfig
