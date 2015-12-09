const packageName = require('../package').name
const suffix = '-commit-message'
const name = packageName.split(suffix)[0]

module.exports = {
  name: name,
  parse: require('./valid-message').parse,
  validate: require('./valid-message').validate,
  prompter: require('./message-wizard').prompter
}
