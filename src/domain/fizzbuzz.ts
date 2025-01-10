export class NotPositiveIntegerError extends Error {
  constructor(value: number, key: string) {
    super(`Value ${value} (${key}) is not a positive integer`)
    this.name = 'NotPositiveIntegerError'
  }
}

const mustBePositiveInteger = (value: number, key: string): void => {
  if (Number.isInteger(value) && value > 0) {
    return
  }
  throw new NotPositiveIntegerError(value, key)
}

export class LimitNotStrictlySuperiorToZeroError extends Error {
  constructor(value: number) {
    super(`Value ${value} (limit) is not a strictly superior to zero integer`)
    this.name = 'LimitNotStrictlySuperiorToZeroError'
  }
}

export class LimitTooBigError extends Error {
  constructor(value: number) {
    super(`Value ${value} (limit) is too big`)
    this.name = 'LimitTooBigError'
  }
}

const mustBeValidLimit = (value: number): void => {
  if (!Number.isInteger(value) || value < 1) {
    throw new LimitNotStrictlySuperiorToZeroError(value)
  }

  try {
    new Array<string>(value)
  } catch {
    throw new LimitTooBigError(value)
  }
}

export const fizzBuzz = (
  int1: number,
  int2: number,
  limit: number,
  str1: string,
  str2: string
): string[] => {
  mustBePositiveInteger(int1, 'int1')
  mustBePositiveInteger(int2, 'int2')
  mustBeValidLimit(limit)

  const res: string[] = new Array<string>(limit)

  for (let i = 0; i < limit; i++) {
    const currentNumber = i + 1
    const isInt1Multiple = currentNumber % int1 === 0
    const isInt2Multiple = currentNumber % int2 === 0

    if (isInt1Multiple && isInt2Multiple) {
      res[i] = str1 + str2
    } else if (isInt1Multiple) {
      res[i] = str1
    } else if (isInt2Multiple) {
      res[i] = str2
    } else {
      res[i] = currentNumber.toString()
    }
  }

  return res
}
