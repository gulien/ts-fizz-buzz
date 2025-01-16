import { server } from '../../src/infrastructure/server'
import request from 'supertest'

describe('GET /ready', () => {
  it('should return a 200 OK response', async () => {
    const response = await request(server('debug')).get('/ready')
    expect(response.status).toBe(200)
  })
})

describe('GET /live', () => {
  it('should return a 200 OK response', async () => {
    const response = await request(server('debug')).get('/live')
    expect(response.status).toBe(200)
  })
})
