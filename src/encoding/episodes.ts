import { crc32 } from 'crc'

export const hashIds = (ids: string[]): string =>
  crc32(ids.join('')).toString(36)

// ENCODING SCHEME:
// iterate over columns left-to-right, top-to-bottom
// if token[column] (substitute _ for missing) repeats more than thrice append as
// .<repeats in hex>.<char>
// otherwise append <char>

export const encodeIds = (ids: string[]): string => {
  const encoded = []
  for (let i = 0; i < Math.max(...ids.map((id) => id.length)); i++) {
    const column = []
    let n = 0
    let last
    for (const id of ids) {
      if ((id[i] ?? '_') !== last) {
        if (n && last)
          column.push(n > 3 ? `.${n.toString(16)}.${last}` : last.repeat(n))
        n = 0
        last = id[i] ?? '_'
      }
      n++
    }
    if (n && last)
      column.push(n > 3 ? `.${n.toString(16)}.${last}` : last.repeat(n))
    encoded.push(column.join(''))
  }

  return encoded.join(',')
}

export const decodeIds = (encoded: string): string[] => {
  const tokens = []

  for (const column of encoded.split(',')) {
    let i = 0
    for (let c = 0; c < column.length; c++) {
      let n = 1

      if (column[c] === '.') {
        c++
        let nstr = ''
        while (column[c] !== '.') {
          nstr += column[c]
          c++
        }
        n = parseInt(nstr, 16)
        c++
      }

      for (let i2 = 0; i2 < n; i2++) {
        if (!tokens[i]) tokens[i] = ''
        tokens[i] += column[c] === '_' ? '' : column[c]
        i++
      }
    }
  }

  return tokens
}
