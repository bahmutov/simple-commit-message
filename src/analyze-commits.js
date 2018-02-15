'use strict'

const parse = require('./valid-message').parse
const la = require('lazy-ass')
const is = require('check-more-types')
const debug = require('debug')('simple')
const {topChange} = require('largest-semantic-change')

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

const isDefined = s => s

// should be compatible with semantic-release v11+
function analyzeCommits (pluginConfig, config) {
  debug('analyze commits')
  debug('release rules %j', pluginConfig)
  const {options, commits} = config
  debug('options %j', options)
  debug('commit', commits)

  la(is.array(commits), 'expected list of commits in', config)

  const semantics = commits.map(c => c.message).map(parse).filter(isDefined)
  debug('semantic commits')
  debug(semantics)

  const types = semantics.map(s => s.type).map(t => changes[t]).filter(isDefined)
  debug('commit release types', types)

  const releaseType = changes[topChange(types)]
  debug('picked top release type', releaseType)

  return releaseType
}

module.exports = analyzeCommits
