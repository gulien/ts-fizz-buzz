import { Router, Request, Response } from 'express'
import { StatsRepository } from '../../domain/stats-repository'
import { StatsHandler } from '../../application/query/stats-query'

export const getStatsRoute = (
  router: Router,
  statsRepository: StatsRepository
): void => {
  const handler = new StatsHandler(statsRepository)

  router.get('/stats', async (req: Request, resp: Response) => {
    const res = await handler.handle()
    resp.status(200).json(res)
  })
}
