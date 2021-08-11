import { DDB, DDBKey } from 'ddbjs'
import type * as AWS from 'aws-sdk'

export * as episodes from './encoding/episodes'
export * as meta from './encoding/meta'

// all dates should be stored in ISO 8601 (JS .toISOString())

export default (
  config: ConstructorParameters<typeof AWS.DynamoDB.DocumentClient>[0]
) => {
  const podcasts = new DDB(
    'echo_podcasts',
    {
      [DDBKey]: 'id',
      id: String,
      title: String,
      author: String,
      description: String,
      feed: String,
      episodeCount: Number,
      artwork: String,
      covers: [String],
      metaCheck: String,
      episodeCheck: String,
      palette: {
        vibrant: String,
        darkVibrant: String,
        lightVibrant: String,
        muted: String,
        darkMuted: String,
        lightMuted: String,
      },
    },
    config
  )

  const episodes = new DDB(
    'echo_episodes',
    {
      [DDBKey]: ['pId', 'eId'],
      pId: String,
      eId: String,
      url: String,
      guid: String,
      published: String,
      title: String,
      shownotes: String,
      firstPass: Boolean,
      duration: Number,
    },
    podcasts.client
  )

  const notifications = new DDB(
    'echo_notifications',
    {
      [DDBKey]: ['pk', 'sk'],
      pk: String,
      sk: String,
      subs: [String],
      user: String,
      ttl: Number,
    },
    podcasts.client
  )

  const parser = new DDB(
    'echo_podcasts',
    {
      [DDBKey]: 'id',
      id: String,
      episodes: [String],
      metaCheck: String,
      episodeCheck: String,
      feed: String,
      crc: String,
      websub: {
        hub: String,
        self: String,
      },
      // last time feed was requested
      lastRequested: String,
      // last time response was updated (according to date response header)
      lastChecked: String,
      // last time feed was modifed (according to last-modified response header)
      lastModified: String,
      lastParsed: String,
      etag: String,
      cacheHeaders: { lastModified: Boolean, etag: Boolean },
    },
    podcasts.client
  )

  const users = new DDB(
    'echo_users',
    {
      [DDBKey]: 'id',
      id: String,
      user: String,
      subscriptions: [String],
      wpSubs: [String],
      current: { podcast: String, episode: String, position: Number },
      roles: [String],
    },
    podcasts.client
  )

  const podsubs = new DDB(
    'echo_users',
    {
      [DDBKey]: 'id',
      id: String,
      subscribers: [String],
      wpSubs: [String],
    },
    podcasts.client
  )

  const playback = new DDB(
    'echo_playback',
    {
      [DDBKey]: ['pk', 'sk'],
      pk: String,
      sk: String,
      position: Number,
      progress: Number,
      lastUpdate: String,
    },
    podcasts.client
  )

  const locks = new DDB(
    'echo_locks',
    { [DDBKey]: 'id', id: String, ttl: Number },
    podcasts.client
  )

  const websub = new DDB(
    'echo_websub',
    {
      [DDBKey]: 'podcast',
      podcast: String,
      hub: String,
      topic: String,
      callback: String,
      status: String,
      secret: String,
      requested: String,
      issued: String,
      expires: String,
      attempts: Number,
      ttl: Number,
    },
    podcasts.client
  )

  return {
    podcasts,
    episodes,
    notifications,
    parser,
    users,
    podsubs,
    playback,
    locks,
    websub,
  }
}
