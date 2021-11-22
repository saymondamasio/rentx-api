import { hash } from 'bcryptjs'
import { createConnection } from 'typeorm'
import { v4 as uuid } from 'uuid'

async function create(): Promise<void> {
  const connection = await createConnection()

  const id = uuid()
  const password = await hash('admin', 8)

  await connection.query(
    'INSERT INTO users(id, name, email, password, admin, driver_license, created_at, updated_at) values($1, $2, $3, $4, $5, $6, now(), now())',
    [id, 'admin', 'admin@rentx.com.br', password, true, 'ABC-1234']
  )

  await connection.close()
}

create().then(() => console.log('Admin created successfully'))
