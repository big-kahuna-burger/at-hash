const test = require('tape')
const AccessTokenHash = require('./index')

test('hashed properly as b64 string', t => {
  t.plan(1)
  AccessTokenHash({ accessToken: 'kahuna' })
    .then(at_hash =>
      t.deepEqual(at_hash, 'ZY6S9PR/oYw2FV0GvOiLKw==', 'hash matches')
    )
    .catch(err => t.fail(err))
})
