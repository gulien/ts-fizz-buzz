import { server } from '../../src/infrastructure/server'
import request from 'supertest'

// False positives.
/* eslint-disable @typescript-eslint/no-misused-promises */

describe('GET /api/v1/fizzbuzz', () => {
  it('should return a fizzbuzz result', async () => {
    const response = await request(server('debug')).get(
      '/api/v1/fizzbuzz?int1=2&int2=3&limit=10&str1=foo&str2=bar'
    )
    expect(response.status).toBe(200)
    expect(response.text).toBe(
      `["1","foo","bar","foo","5","foobar","7","foo","bar","foo"]`
    )
  })
  it('should return a 400 Bad Request if no query parameters', async () => {
    const response = await request(server('debug')).get('/api/v1/fizzbuzz')
    expect(response.status).toBe(400)
    expect(response.text).toBe(
      'All query parameters (int1, int2, limit, str1, str2) must be provided as strings'
    )
  })
  it('should return a 400 Bad Request if int1 is not an integer', async () => {
    const response = await request(server('debug')).get(
      '/api/v1/fizzbuzz?int1=foo&int2=3&limit=10&str1=foo&str2=bar'
    )
    expect(response.status).toBe(400)
    expect(response.text).toBe('int1, int2, and limit must be valid numbers')
  })
  it('should return a 400 Bad Request if int1 is not positive', async () => {
    const response = await request(server('debug')).get(
      '/api/v1/fizzbuzz?int1=-2&int2=3&limit=10&str1=foo&str2=bar'
    )
    expect(response.status).toBe(400)
    expect(response.text).toBe('Value -2 (int1) is not a positive integer')
  })
  it('should return a 400 Bad Request if int2 is not an integer', async () => {
    const response = await request(server('debug')).get(
      '/api/v1/fizzbuzz?int1=2&int2=foo&limit=10&str1=foo&str2=bar'
    )
    expect(response.status).toBe(400)
    expect(response.text).toBe('int1, int2, and limit must be valid numbers')
  })
  it('should return a 400 Bad Request if int2 is not positive', async () => {
    const response = await request(server('debug')).get(
      '/api/v1/fizzbuzz?int1=2&int2=-3&limit=10&str1=foo&str2=bar'
    )
    expect(response.status).toBe(400)
    expect(response.text).toBe('Value -3 (int2) is not a positive integer')
  })
  it('should return a 400 Bad Request if limit is not an integer', async () => {
    const response = await request(server('debug')).get(
      '/api/v1/fizzbuzz?int1=foo&int2=3&limit=foo&str1=foo&str2=bar'
    )
    expect(response.status).toBe(400)
    expect(response.text).toBe('int1, int2, and limit must be valid numbers')
  })
  it('should return a 400 Bad Request if limit is not strictly superior to zero', async () => {
    const response = await request(server('debug')).get(
      '/api/v1/fizzbuzz?int1=2&int2=3&limit=-1&str1=foo&str2=bar'
    )
    expect(response.status).toBe(400)
    expect(response.text).toBe(
      'Value -1 (limit) is not a strictly superior to zero integer'
    )
  })
  it('should return a 400 Bad Request if limit is too big', async () => {
    const response = await request(server('debug')).get(
      '/api/v1/fizzbuzz?int1=2&int2=3&limit=1000000000000&str1=foo&str2=bar'
    )
    expect(response.status).toBe(400)
    expect(response.text).toBe('Value 1000000000000 (limit) is too big')
  })
})
