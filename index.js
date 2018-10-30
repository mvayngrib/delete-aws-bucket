const emptyBucket = require('empty-aws-bucket')

const deleteBucket = async ({ s3, bucket }) => {
  const Bucket = bucket

  // if AWS SDK debugging is enabled, log our actions
  const debug = (...args) => {
    if (process.env.AWSJS_DEBUG) {
      console.log(`delete-aws-bucket | ${Bucket} |`, ...args)
    }
  }

  // before we can delete the bucket, we must delete all versions of all objects
  await emptyBucket({ s3, bucket })

  // finally, delete the empty bucket
  try {
    debug('Deleting bucket')
    await s3.deleteBucket({ Bucket }).promise()
  } catch (e) {
    if (e.code === 'NoSuchBucket') {
      debug('Bucket not found!')
    } else {
      throw e
    }
  }
}

module.exports = deleteBucket
