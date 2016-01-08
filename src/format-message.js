const la = require('lazy-ass')
const is = require('check-more-types')

const wrap = require('word-wrap')
const maxLineWidth = 100
const wrapOptions = {
  trim: true,
  newline: '\n',
  indent: '',
  width: maxLineWidth
}
const BREAKING = 'BREAKING CHANGE'

function formatMessage (answers) {
  la(is.object(answers), 'missing answers', answers)
  var breakingChange = answers.breaking ? BREAKING + ': ' : ''

  // Hard limit the subject line
  var head = (answers.type + '(' + answers.scope.trim() + '): ' +
    breakingChange + answers.subject.trim()).slice(0, maxLineWidth)

  // Wrap these lines at 100 characters
  var body = wrap(
    (answers.breaking ? BREAKING + '\n' : '') + answers.body,
    wrapOptions)
  var issues = wrap(answers.issues, wrapOptions)
  const hasTag = is.unemptyString(answers.tag) &&
    (answers.tag !== 'currentTag')
  var usedTag = hasTag ? ('\nTAG: ' + answers.tag) : ''
  const message = head + '\n\n' + body + usedTag + '\n\n' + issues
  return message.trim()
}

module.exports = formatMessage

if (!module.parent) {
  console.log(formatMessage({
    type: 'fix',
    breaking: true,
    scope: 'scope',
    subject: 'this is a subject',
    body: 'longer text\nsecond line\nthird line\n\n',
    issues: 'no issues',
    tag: ''
  }))
}
