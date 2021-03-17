import { DDB } from 'ddbjs'
import type * as AWS from 'aws-sdk'

export * as episodes from './encoding/episodes'

export default (
  config: ConstructorParameters<typeof AWS.DynamoDB.DocumentClient>[0]
) => {
  const podcasts = new DDB(
    'echo_podcasts',
    {
      key: 'id',
      id: String,
      title: String,
      author: String,
      description: String,
      feed: String,
      episodeCount: Number,
      artwork: String,
      covers: [String],
      check: String,
      episodeCheck: String,
    },
    config
  )

  const episodes = new DDB(
    'echo_episodes',
    {
      key: ['pId', 'eId'],
      pId: String,
      eId: String,
      url: String,
      guid: String,
      published: Number,
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
      key: ['pk', 'sk'],
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
      key: 'id',
      id: String,
      episodes: [String],
      metaCheck: String,
      episodeCheck: String,
      feed: String,
      lastParsed: Number,
      crc: String,
      websub: {
        hub: String,
        self: String,
      },
    },
    podcasts.client
  )

  const users = new DDB(
    'echo_users',
    {
      key: 'id',
      id: String,
      user: String,
      subscriptions: [String],
      wpSubs: [String],
      current: { podcast: String, episode: String, position: Number },
    },
    podcasts.client
  )

  const podsubs = new DDB(
    'echo_users',
    {
      key: 'id',
      id: String,
      subscribers: [String],
      wpSubs: [String],
    },
    podcasts.client
  )

  const playback = new DDB(
    'echo_playback',
    {
      key: ['pk', 'sk'],
      pk: String,
      sk: String,
      position: Number,
      progress: Number,
      lastUpdate: Number,
    },
    podcasts.client
  )

  const locks = new DDB(
    'echo_locks',
    { key: 'id', id: String, ttl: Number },
    podcasts.client
  )

  const websub = new DDB(
    'echo_websub',
    {
      key: 'podcast',
      podcast: String,
      hub: String,
      topic: String,
      callback: String,
      status: String,
      secret: String,
      requested: Number,
      issued: Number,
      expires: Number,
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
