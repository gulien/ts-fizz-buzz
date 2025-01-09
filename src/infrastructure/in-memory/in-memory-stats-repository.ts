import {
  Entry,
  MostFrequentEntry,
  StatsRepository
} from '../../domain/stats-repository'
import { Mutex } from 'async-mutex'

export class InMemoryStatsRepository implements StatsRepository {
  private mostFrequent: Entry | undefined
  private counter: Map<string, number> = new Map()
  private mu: Mutex = new Mutex()

  async addEntry(entry: Entry): Promise<void> {
    await this.mu.runExclusive(() => {
      const entryKey = JSON.stringify(entry)

      if (!this.mostFrequent) {
        // No most frequent -> this is the first entry.
        this.mostFrequent = entry
        this.counter.set(entryKey, 1)
        return
      }

      const mostFrequentKey = JSON.stringify(this.mostFrequent)
      const mostFrequentCount = this.counter.get(mostFrequentKey) ?? 0

      if (entryKey === mostFrequentKey) {
        // If the entry is the same as the current most frequent, just increment.
        this.counter.set(mostFrequentKey, mostFrequentCount + 1)
        return
      }

      // If different, increment or init to 1.
      const currentCount = this.counter.get(entryKey) ?? 0
      const newCount = currentCount + 1
      this.counter.set(entryKey, newCount)

      // If newCount > mostFrequentCount, update the most frequent
      // (older prevails if equal, so only update if strictly greater).
      if (newCount > mostFrequentCount) {
        this.mostFrequent = entry
      }
    })
  }

  async getMostFrequentEntry(): Promise<MostFrequentEntry> {
    return await this.mu.runExclusive(() => {
      let res: MostFrequentEntry = {
        entry: {} as Entry,
        count: 0
      }

      if (!this.mostFrequent) {
        // No entries yet.
        return res
      }

      const key = JSON.stringify(this.mostFrequent)
      const count = this.counter.get(key) ?? 0

      res = {
        entry: this.mostFrequent,
        count: count
      }

      return res
    })
  }
}
