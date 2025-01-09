import { Router, Request, Response } from 'express'
import {
  FizzBuzzHandler,
  FizzBuzzQuery
} from '../../application/query/fizzbuzz-query'
import {
  LimitNotStrictlySuperiorToZeroError,
  LimitTooBigError,
  NotPositiveIntegerError
} from '../../domain/fizzbuzz'
import { StatsRepository } from '../../domain/stats-repository'

export const getFizzBuzzRoute = (
  router: Router,
  statsRepository: StatsRepository
): void => {
  const handler = new FizzBuzzHandler(statsRepository)

  router.get('/fizzbuzz', async (req: Request, resp: Response) => {
    const int1Param = req.query.int1
    const int2Param = req.query.int2
    const limitParam = req.query.limit
    const str1Param = req.query.str1
    const str2Param = req.query.str2

    if (
        typeof int1Param !== 'string' ||
        typeof int2Param !== 'string' ||
        typeof limitParam !== 'string' ||
        typeof str1Param !== 'string' ||
        typeof str2Param !== 'string'
    ) {
      resp
          .status(400)
          .send(
              'All query parameters (int1, int2, limit, str1, str2) must be provided as strings'
          )
      return
    }

    const int1 = parseInt(int1Param, 10)
    const int2 = parseInt(int2Param, 10)
    const limit = parseInt(limitParam, 10)
    const str1 = str1Param
    const str2 = str2Param

    if (Number.isNaN(int1) || Number.isNaN(int2) || Number.isNaN(limit)) {
      resp.status(400).send('int1, int2, and limit must be valid numbers')
      return
    }

    const query: FizzBuzzQuery = {
      int1: int1,
      int2: int2,
      limit: limit,
      str1: str1,
      str2: str2
    }

    try {
      const res = await handler.handle(query)
      resp.status(200).json(res)
    } catch (e: unknown) {
      if (
          e instanceof NotPositiveIntegerError ||
          e instanceof LimitNotStrictlySuperiorToZeroError ||
          e instanceof LimitTooBigError
      ) {
        resp.status(400).send(e.message)
        return
      }
      throw e
    }
  })
}
