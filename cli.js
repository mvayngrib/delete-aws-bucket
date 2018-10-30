#!/usr/bin/env node

const AWS = require('aws-sdk')
const del = require('./')
const bucket = process.argv[2]

const profile = process.env.AWS_PROFILE || process.env.AWS_DEFAULT_PROFILE
if (profile) {
  AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile })
}

const s3 = new AWS.S3()
del({ s3, bucket }).catch(console.error)
