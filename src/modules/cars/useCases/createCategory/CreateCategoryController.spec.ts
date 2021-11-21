import { hash } from 'bcryptjs'
import request from 'supertest'
import { Connection, createConnection } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { app } from '@shared/infra/http/app'

let connection: Connection

describe('Create Category Controller', () => {
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

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Ford',
        description: 'Carros da marca Ford',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(201)
  })

  it('should be able to create a new category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    })

    const { token } = responseToken.body

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Ford',
        description: 'Carros da marca Ford',
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400)
  })
})
