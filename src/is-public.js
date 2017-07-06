const validMessage = require('./valid-message')

// users only care about these commit types
const publicTypes = {
  major: true,
  break: true,
  minor: true,
  feat: true,
  fix: true,
  patch: true
}

function isPublicCommitType (s) {
  if (!validMessage.isValidType(s)) {
    return false
  }
  return Boolean(publicTypes[s])
}

module.exports = isPublicCommitType
