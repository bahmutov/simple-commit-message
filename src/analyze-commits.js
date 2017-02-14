'use strict'

const parse = require('./valid-message').parse
const topChange = require('largest-semantic-change').topChange
const debug = require('debug')('simple')

// semantic-release only understands
// major, minor and patch
// make sure our aliases are all mapped back
const changes = {
  major: 'major',
  break: 'major',
  minor: 'minor',
  feat: 'minor',
  patch: 'patch',
  fix: 'patch'
}

function analyzeCommits (pluginConfig, config, callback) {
  debug('analyzeCommits with %d commits', config.commits.length)
  debug(config.commits)

  const semantic = config.commits
    .map(c => parse(c.message))
    .filter(c => c)

  console.log('found %d semantic commits', semantic.length)
  console.log(semantic)

  const top = topChange(semantic)
  const change = changes[top]
  debug('top semantic change', top, 'change', change)

  return change
}

module.exports = analyzeCommits
