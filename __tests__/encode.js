const ids = require('./ids')
const { encodeIds, decodeIds, hashIds } = require('../lib/encoding/episodes')

if (hashIds(ids) !== 'rd09pl') throw Error('incorrect crc ' + hashIds(ids))
else console.log('crc matches')

const encoded = encodeIds(ids)
const decoded = decodeIds(encoded)

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
