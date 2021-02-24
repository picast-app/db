const ids = require('./ids')
const { encode, decode } = require('../lib/encoding/vertical')

const encoded = encode(ids)
const decoded = decode(encoded)

const matches = (a, b) =>
  a.length !== b.length ? false : a.every((v, i) => v === b[i])

if (matches(ids, decoded)) console.log('success')
else throw Error('encoding or decoding failed')

const enc = new TextEncoder()
console.log(
  `test set ${Math.round(
    (enc.encode(encoded).length / enc.encode(ids.join(',')).length) * 100
  )}% compressed`
)
