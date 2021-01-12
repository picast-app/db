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
    },
    config
  )

  return { podcasts }
}
