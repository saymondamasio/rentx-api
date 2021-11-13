import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export const createConnectionApplication = async (
  host = 'database'
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentx_test'
          : defaultOptions.database,
    })
  )
}
