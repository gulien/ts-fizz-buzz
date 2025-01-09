// Entry gathers the parameters of a fizzbuzz request.
export type Entry = {
  readonly int1: number
  readonly int2: number
  readonly limit: number
  readonly str1: string
  readonly str2: string
}

// MostFrequentEntry represents the most frequent fizzbuzz request. It is a
// composition of an Entry and count, i.e., the number of occurrences of this
// entry.
export type MostFrequentEntry = {
  readonly entry: Entry
  readonly count: number
}

export interface StatsRepository {
  addEntry(entry: Entry): Promise<void>
  getMostFrequentEntry(): Promise<MostFrequentEntry>
}
