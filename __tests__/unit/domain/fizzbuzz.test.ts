import {
  fizzBuzz,
  LimitNotStrictlySuperiorToZeroError,
  LimitTooBigError,
  NotPositiveIntegerError
} from '../../../src/domain/fizzbuzz'

describe('fizzbuzz', () => {
  it('should throw a NotPositiveIntegerError if int1 is not an integer', () => {
    expect(() => fizzBuzz(2.3, 3, 10, 'foo', 'bar')).toThrow(
      new NotPositiveIntegerError(2.3, 'int1')
    )
  })
  it('should throw a NotPositiveIntegerError if int1 is not positive', () => {
    expect(() => fizzBuzz(-2, 3, 10, 'foo', 'bar')).toThrow(
      new NotPositiveIntegerError(-2, 'int1')
    )
  })
  it('should throw a NotPositiveIntegerError if int2 is not an integer', () => {
    expect(() => fizzBuzz(2, 3.2, 10, 'foo', 'bar')).toThrow(
      new NotPositiveIntegerError(3.2, 'int2')
    )
  })
  it('should throw a NotPositiveIntegerError if int2 is not positive', () => {
    expect(() => fizzBuzz(2, -3, 10, 'foo', 'bar')).toThrow(
      new NotPositiveIntegerError(-3, 'int2')
    )
  })
  it('should throw a LimitNotStrictlySuperiorToZeroError if limit is not an integer', () => {
    expect(() => fizzBuzz(2, 3, 10.2, 'foo', 'bar')).toThrow(
      new LimitNotStrictlySuperiorToZeroError(10.2)
    )
  })
  it('should throw a LimitNotStrictlySuperiorToZeroError if limit is not positive', () => {
    expect(() => fizzBuzz(2, 3, -10, 'foo', 'bar')).toThrow(
      new LimitNotStrictlySuperiorToZeroError(-10)
    )
  })
  it('should throw a LimitNotStrictlySuperiorToZeroError if limit is zero', () => {
    expect(() => fizzBuzz(2, 3, 0, 'foo', 'bar')).toThrow(
      new LimitNotStrictlySuperiorToZeroError(0)
    )
  })
  it('should throw a LimitTooBigError if limit is too big', () => {
    expect(() => fizzBuzz(2, 3, 100000000000, 'foo', 'bar')).toThrow(
      new LimitTooBigError(100000000000)
    )
  })
  it('should return a fizzbuzz result', () => {
    expect(fizzBuzz(2, 3, 10, 'foo', 'bar')).toStrictEqual([
      '1',
      'foo',
      'bar',
      'foo',
      '5',
      'foobar',
      '7',
      'foo',
      'bar',
      'foo'
    ])
    expect(fizzBuzz(1, 1, 10, 'foo', 'bar')).toStrictEqual([
      'foobar',
      'foobar',
      'foobar',
      'foobar',
      'foobar',
      'foobar',
      'foobar',
      'foobar',
      'foobar',
      'foobar'
    ])
    expect(fizzBuzz(1, 1, 10, '', '')).toStrictEqual([
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    ])
    expect(fizzBuzz(11, 12, 10, '', '')).toStrictEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10'
    ])
  })
})
