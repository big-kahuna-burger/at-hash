const { createHash } = require('crypto')

// documentation of at_hash: https://openid.net/specs/openid-connect-core-1_0.html#ImplicitIDToken

function AccessTokenHash ({ accessToken, alg = 'RS256' }) {
  if (!accessToken) {
    return Promise.reject(new Error('accessToken is required'))
  }
  if (alg !== 'RS256') {
    return Promise.reject(new Error('unssuported hashing algorithm'))
  }
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256')
    hash.on('readable', () => {
      const data = hash.read().slice(0, 16) // one should encode leftmost 128 of 256 BITS. This buffer contains bytes, so slice 0, 128/8
      if (data) {
        return resolve(data.toString('base64'))
      }
    })
    hash.write(accessToken)
    hash.end()
  })
}

module.exports = AccessTokenHash
