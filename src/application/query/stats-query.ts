import {
  MostFrequentEntry,
  StatsRepository
} from '../../domain/stats-repository'

export class StatsHandler {
  private readonly statsRepository: StatsRepository

  constructor(statsRepository: StatsRepository) {
    this.statsRepository = statsRepository
  }

  async handle(): Promise<MostFrequentEntry> {
    return this.statsRepository.getMostFrequentEntry()
  }
}
