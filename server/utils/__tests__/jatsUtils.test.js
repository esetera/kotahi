const { convertCharacterEntities } = require('../jatsUtils')

describe('convertCharacterEntities', () => {
  test('basic', () => {
    expect(
      convertCharacterEntities(
        'asdf &amp; <p class="blah">foo &gt; ©大 bar</p> &Omega;',
      ),
    ).toEqual(
      'asdf &#x26; <p class="blah">foo &#x3E; &#xA9;&#x5927; bar</p> &#x3A9;',
    )
  })
})
