import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export const createConnectionApplication = async (
  host = 'database'
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  )
}
