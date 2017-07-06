'use strict'

const packageName = require('../package').name
const suffix = '-commit-message'
const name = packageName.split(suffix)[0]
const analyzeCommits = require('./analyze-commits') // eslint-disable-line no-unused-vars

// to be compatible with "semantic-release" need to
// export the analyze commits function. But we can
// extend it with additional properties, just have to
// play a trick to get the "name" property right
const analyze = eval( // eslint-disable-line no-eval
`(function ${name} () {
  return analyzeCommits.apply(null, arguments)
})`)

const props = {
  parse: require('./valid-message').parse,
  validate: require('./valid-message').validate,
  prompter: require('./message-wizard').prompter,
  isPublic: require('./is-public')
}

const combined = Object.assign(analyze, props)
module.exports = combined
