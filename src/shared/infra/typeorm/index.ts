import {
  Connection,
  createConnection,
  createConnections,
  getConnectionOptions,
} from 'typeorm'

export const createConnectionApplication = async (
  host: string,
  name?: string
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions(name)

  return await createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentx_test'
          : defaultOptions.database,
    })
  )
}

export const createConnectionsApplication = async (): Promise<Connection[]> => {
  const defaultOptionsPostgres = await getConnectionOptions()
  const defaultOptionsMongo = await getConnectionOptions('mongo')

  return await createConnections([
    Object.assign(defaultOptionsPostgres, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : 'rentx_postgres',
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentx_test'
          : defaultOptionsPostgres.database,
    }),
    Object.assign(defaultOptionsMongo, {
      name: 'mongo',
      host: process.env.NODE_ENV === 'test' ? 'localhost' : 'rentx_mongo',
      database:
        process.env.NODE_ENV === 'test'
          ? 'rentx_test'
          : defaultOptionsMongo.database,
    }),
  ])
}
