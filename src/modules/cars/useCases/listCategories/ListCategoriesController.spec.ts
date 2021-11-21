import { hash } from 'bcryptjs'
import request from 'supertest'
import { Connection, createConnection } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { app } from '@shared/infra/http/app'

let connection: Connection

describe('List Categories Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations()

    const id = uuid()
    const password = await hash('admin', 8)

    await connection.query(
      'INSERT INTO users(id, name, email, password, admin, driver_license, created_at, updated_at) values($1, $2, $3, $4, $5, $6, now(), now())',
      [id, 'admin', 'admin@rentx.com.br', password, true, 'ABC-1234']
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to list all available categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    })

    const { token } = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: 'Ford',
        description: 'Carros da marca Ford',
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app).get('/categories')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toEqual('Ford')
  })
})
