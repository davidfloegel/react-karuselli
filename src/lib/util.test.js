import { DIRECTION, ARROW_KEYS, RESPONSIVE_THRESHOLDS, determineScreenSize } from './util'

it('should test all constants are still same', () => {
  expect(ARROW_KEYS).toEqual({
    LEFT: 37,
    RIGHT: 39
  })

  expect(DIRECTION, {
    LEFT: 'left',
    RIGHT: 'right'
  })

  expect(RESPONSIVE_THRESHOLDS).toEqual({
    sm: 768,
    md: 992,
    lg: 1200
  })
})

describe('test determineScreenSize()', () => {
  const sizeClasses = {
    sm: 768,
    md: 992,
    lg: 1200
  }

  it('it should return xs', () => {
    expect(determineScreenSize(568, sizeClasses)).toEqual('xs')
  })

  it('it should return sm', () => {
    expect(determineScreenSize(768, sizeClasses)).toEqual('sm')
    expect(determineScreenSize(800, sizeClasses)).toEqual('sm')
  })

  it('it should return md', () => {
    expect(determineScreenSize(992, sizeClasses)).toEqual('md')
    expect(determineScreenSize(1024, sizeClasses)).toEqual('md')
  })

  it('it should return lg', () => {
    expect(determineScreenSize(1200, sizeClasses)).toEqual('lg')
    expect(determineScreenSize(1440, sizeClasses)).toEqual('lg')
  })
})