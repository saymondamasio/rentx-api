interface IMailConfig {
  provider: 'ethereal' | 'ses'

  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export const mailConfig = {
  provider: process.env.MAIL_PROVIDER || 'ethereal',
  defaults: {
    from: {
      email: 'saymon.damasio95@gmail.com',
      name: 'Saymon D',
    },
  },
} as IMailConfig
