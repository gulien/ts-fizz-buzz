import express, { Express, Request, Response } from 'express'
import pino from 'pino-http'
import { InMemoryStatsRepository } from './in-memory/in-memory-stats-repository'
import { getFizzBuzzRoute } from './routes/get-fizzbuzz-route'
import { getStatsRoute } from './routes/get-stats-route'

export const server = (loglevel: string): Express => {
  const app = express()
  const router = express.Router()

  app.use(pino({ useLevel: loglevel }))
  app.get('/ready', (req: Request, resp: Response) => {
    resp.status(200).send()
  })
  app.get('/live', (req: Request, resp: Response) => {
    resp.status(200).send()
  })

  const statsRepository = new InMemoryStatsRepository()
  getFizzBuzzRoute(router, statsRepository)
  getStatsRoute(router, statsRepository)
  app.use('/api/v1', router)

  return app
}
