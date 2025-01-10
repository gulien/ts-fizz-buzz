import { server } from '../../src/infrastructure/server'
import request from 'supertest'

// False positives.
/* eslint-disable @typescript-eslint/no-misused-promises */

describe('GET /api/v1/stats', () => {
  it('should return an empty result if no entry', async () => {
    const response = await request(server('debug')).get('/api/v1/stats')
    expect(response.status).toBe(200)
    expect(response.text).toBe(`{"entry":{},"count":0}`)
  })
  it('should return the most frequent entry', async () => {
    const srv = server('debug')

    // Only one entry.
    let response = await request(srv).get(
      '/api/v1/fizzbuzz?int1=2&int2=3&limit=10&str1=foo&str2=bar'
    )
    expect(response.status).toBe(200)

    response = await request(srv).get('/api/v1/stats')
    expect(response.status).toBe(200)
    expect(response.text).toBe(
      `{"entry":{"int1":2,"int2":3,"limit":10,"str1":"foo","str2":"bar"},"count":1}`
    )

    // Two different entries, but most frequent one is the first one.
    await request(srv).get(
      '/api/v1/fizzbuzz?int1=2&int2=3&limit=10&str1=baz&str2=qux'
    )
    expect(response.status).toBe(200)

    response = await request(srv).get('/api/v1/stats')
    expect(response.status).toBe(200)
    expect(response.text).toBe(
      `{"entry":{"int1":2,"int2":3,"limit":10,"str1":"foo","str2":"bar"},"count":1}`
    )

    // Most frequent entry updated.
    await request(srv).get(
      '/api/v1/fizzbuzz?int1=2&int2=3&limit=10&str1=foo&str2=bar'
    )
    expect(response.status).toBe(200)

    response = await request(srv).get('/api/v1/stats')
    expect(response.status).toBe(200)
    expect(response.text).toBe(
      `{"entry":{"int1":2,"int2":3,"limit":10,"str1":"foo","str2":"bar"},"count":2}`
    )

    // New frequent entry.
    await request(srv).get(
      '/api/v1/fizzbuzz?int1=2&int2=3&limit=10&str1=baz&str2=qux'
    )
    expect(response.status).toBe(200)
    await request(srv).get(
      '/api/v1/fizzbuzz?int1=2&int2=3&limit=10&str1=baz&str2=qux'
    )
    expect(response.status).toBe(200)

    response = await request(srv).get('/api/v1/stats')
    expect(response.status).toBe(200)
    expect(response.text).toBe(
      `{"entry":{"int1":2,"int2":3,"limit":10,"str1":"baz","str2":"qux"},"count":3}`
    )
  })
})
