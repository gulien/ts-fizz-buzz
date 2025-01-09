import { fizzBuzz } from '../../domain/fizzbuzz'

export class FizzBuzzQuery {
  readonly int1: number
  readonly int2: number
  readonly limit: number
  readonly str1: string
  readonly str2: string

  constructor(
    int1: number,
    int2: number,
    limit: number,
    str1: string,
    str2: string
  ) {
    this.int1 = int1
    this.int2 = int2
    this.limit = limit
    this.str1 = str1
    this.str2 = str2
  }
}

export class FizzBuzzHandler {
  handle(query: FizzBuzzQuery): string[] {
    return fizzBuzz(query.int1, query.int2, query.limit, query.str1, query.str2)
  }
}
