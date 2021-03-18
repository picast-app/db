import { crc32 } from 'crc'

const metaKeys = [
  'feed',
  'title',
  'author',
  'description',
  'subtitle',
  'artwork',
  'palette',
]

export const check = (meta: any) =>
  crc32(
    JSON.stringify(
      Object.fromEntries(
        Object.entries(meta).filter(([k]) => metaKeys.includes(k))
      )
    )
  ).toString(36)
