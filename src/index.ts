import { DDB } from 'sane-ddb'
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
      art: [String],
      check: String,
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
    },
    podcasts.client
  )

  const notifications = new DDB('echo_notifications', {
    key: ['pk', 'sk'],
    pk: String,
    sk: String,
    subs: [String],
    ttl: Number,
  })

  return { podcasts, episodes, notifications }
}
