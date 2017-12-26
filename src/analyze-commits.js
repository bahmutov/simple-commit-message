'use strict'

const parse = require('./valid-message').parse
const la = require('lazy-ass')

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

/* pluginConfig, config */
function analyzeCommits (releaseRules, commit) {
  const semantic = parse(commit.message)
  if (!semantic) {
    return
  }
  console.log('found semantic')
  console.log(semantic)

  const releaseType = changes[semantic.type]
  la(releaseType, 'could not pick release type from', semantic)

  return releaseType
}

module.exports = analyzeCommits
