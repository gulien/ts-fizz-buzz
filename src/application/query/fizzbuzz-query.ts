import { fizzBuzz } from '../../domain/fizzbuzz'
import { StatsRepository } from '../../domain/stats-repository'

export type FizzBuzzQuery = {
  readonly int1: number
  readonly int2: number
  readonly limit: number
  readonly str1: string
  readonly str2: string
}

export class FizzBuzzHandler {
  private readonly statsRepository: StatsRepository

  constructor(statsRepository: StatsRepository) {
    this.statsRepository = statsRepository
  }

  async handle(query: FizzBuzzQuery): Promise<string[]> {
    const res = fizzBuzz(
      query.int1,
      query.int2,
      query.limit,
      query.str1,
      query.str2
    )
    await this.statsRepository.addEntry({
      int1: query.int1,
      int2: query.int2,
      limit: query.limit,
      str1: query.str1,
      str2: query.str2
    })
    return res
  }
}
