'use strict'

const parse = require('./valid-message').parse

function analyzeCommits (pluginConfig, config, callback) {
  console.log('analyzeCommits')
  console.log(config.commits)
  const semantic = config.commits
    .map(c => parse(c.message))
    .filter(c => c)
  console.log('parsed commits')
  console.log(semantic)
}

module.exports = analyzeCommits
