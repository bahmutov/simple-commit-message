'use strict'

const la = require('lazy-ass')
const check = require('check-more-types')
const util = require('util')
const semver = require('semver')

const MAX_LENGTH = 100
const PATTERN = /^((?:fixup!\s*)?(\w*)(\(([\w$.*/-]*)\))?: (.*))(\n|$)/
const IGNORED = /^WIP:/

// simplified types
// major, break -> major version increment
// feat -> minor version increment
// fix -> patch version increment
// chore -> no version increment
// everything else -> not a semantic commit message, ignored
// NOTE: both "major" and "break" -> "major"
const TYPES = {
  major: true,
  break: true,
  feat: true,
  fix: true,
  chore: true
}

const TYPE_MAP = {
  major: 'major',
  break: 'major',
  feat: 'feat',
  fix: 'fix',
  chore: 'chore'
}

function parseMessage (str) {
  la(check.string(str), 'expected string message', str)

  var match = PATTERN.exec(str)

  if (!match) {
    return
  }

  const type = TYPE_MAP[match[2]] || match[2]
  return {
    firstLine: match[1],
    type: type,
    scope: match[4],
    subject: match[5]
  }
}

function validateMessage (message, log) {
  la(check.string(message), 'expected string message', message)
  message = message.trim()
  if (!log) {
    log = console.error.bind(console)
  }

  if (semver.valid(message)) {
    return true
  }

  function failedMessage () {
    // gitx does not display it
    // http://gitx.lighthouseapp.com/projects/17830/tickets/294-feature-display-hook-error-message-when-hook-fails
    // https://groups.google.com/group/gitx/browse_thread/thread/a03bcab60844b812
    log('INVALID COMMIT MSG: ' + util.format.apply(null, arguments))
    log('Commit message should follow semantic convention')
    log('Examples:\n' +
      '  major(api): API rewrite, not backwards compatible!\n' +
      '  feat(log): add new logging feature\n' +
      '  fix(config): always load config first\n' +
      '  chore(ci): semantic commit without triggering new version\n')
    log('Please see https://github.com/bahmutov/simple-commit-message#valid-commit-messages')
  }

  if (IGNORED.test(message)) {
    console.log('Commit message validation ignored.')
    return true
  }

  var parsed = parseMessage(message)
  if (!parsed) {
    failedMessage('does not match "<type>(<scope>): <subject>" ! was: ' + message)
    return false
  }

  if (parsed.firstLine.length > MAX_LENGTH) {
    failedMessage('is longer than %d characters !', MAX_LENGTH)
    return false
  }

  if (!TYPES.hasOwnProperty(parsed.type)) {
    failedMessage('"%s" is not allowed type !', parsed.type)
    return false
  }

  // Some more ideas, do want anything like this ?
  // - Validate the rest of the message (body, footer, BREAKING CHANGE annotations)
  // - allow only specific scopes (eg. fix(docs) should not be allowed ?
  // - auto correct the type to lower case ?
  // - auto correct first letter of the subject to lower case ?
  // - auto add empty line after subject ?
  // - auto remove empty () ?
  // - auto correct typos in type ?
  // - store incorrect messages, so that we can learn

  return true
}

module.exports = {
  validate: validateMessage,
  parse: parseMessage
}
