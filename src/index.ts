import { DDB } from 'ddbjs'
import type * as AWS from 'aws-sdk'

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
    },
    podcasts.client
  )

  const podsubs = new DDB(
    'echo_users',
    {
      key: 'id',
      id: String,
      subscribers: [String],
    },
    podcasts.client
  )

  return { podcasts, episodes, notifications, parser, users, podsubs }
}
