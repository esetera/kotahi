const {
  deepMergeObjectsReplacingArrays,
  ensureJsonIsParsed,
} = require('../objectUtils')

describe('ensureJsonIsParsed', () => {
  test('notYetParsed', () => {
    expect(ensureJsonIsParsed('{"a": 1, "b": true}')).toEqual({ a: 1, b: true })
  })
  test('alreadyParsed', () => {
    expect(ensureJsonIsParsed({ a: 1, b: true })).toEqual({ a: 1, b: true })
  })
})

describe('deepMergeObjectsReplacingArrays', () => {
  test('merge', () => {
    expect(
      deepMergeObjectsReplacingArrays(
        {
          a: 'Apple',
          c: [1, 'b', { c: 'asdf' }],
          d: ['x', 3.14159, { z: 'qwer' }],
          e: { foo: 12, bar: 34, baz: [45, 56] },
          f: [1, 2, 3],
        },
        {
          a: 'Aardvark',
          b: [1, 2, { third: 3 }],
          c: ['this', 'that', { other: '...' }],
          e: { bar: 34.34, baz: ['l', 'm', 'n'] },
          f: 'fiddle',
        },
      ),
    ).toEqual({
      a: 'Aardvark',
      b: [1, 2, { third: 3 }],
      c: ['this', 'that', { other: '...' }],
      d: ['x', 3.14159, { z: 'qwer' }],
      e: { foo: 12, bar: 34.34, baz: ['l', 'm', 'n'] },
      f: 'fiddle',
    })
  })
})
