import { Connection, createConnections, getConnectionOptions } from 'typeorm'

export const createConnectionApplication = async (): Promise<Connection[]> => {
  const defaultOptionsPostgres = await getConnectionOptions()
  const defaultOptionsMongo = await getConnectionOptions('mongo')

  return createConnections([
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
