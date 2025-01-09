import express, { Request, Response } from 'express'
import * as process from 'node:process'
import pino from 'pino-http'
import { getFizzBuzzRoute } from './routes/get-fizzbuzz-route'
import { InMemoryStatsRepository } from './in-memory/in-memory-stats-repository'
import { getStatsRoute } from './routes/get-stats-route'

export const run = (): void => {
  const app = express()
  const router = express.Router()
  const port = process.env.PORT || 3000
  const loglevel = process.env.LOG_LEVEL || 'info'

  app.use(pino({ useLevel: loglevel }))
  app.get('/ready', (req: Request, resp: Response) => {
    resp.status(200)
  })
  app.get('/live', (req: Request, resp: Response) => {
    resp.status(200)
  })

  const statsRepository = new InMemoryStatsRepository()
  getFizzBuzzRoute(router, statsRepository)
  getStatsRoute(router, statsRepository)
  app.use('/api/v1', router)

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}
