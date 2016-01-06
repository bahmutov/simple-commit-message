const wrap = require('word-wrap')

function formatMessage (answers) {
  const maxLineWidth = 100
  const wrapOptions = {
    trim: true,
    newline: '\n',
    indent: '',
    width: maxLineWidth
  }

  var breakingChange = answers.breaking ? 'BREAKING CHANGE: ' : ''
  // Hard limit this line
  var head = (answers.type + '(' + answers.scope.trim() + '): ' +
    breakingChange + answers.subject.trim()).slice(0, maxLineWidth)

  // Wrap these lines at 100 characters
  var body = wrap(breakingChange + answers.body, wrapOptions)
  var issues = wrap(answers.issues, wrapOptions)
  var usedTag = answers.tag === 'currentTag' ? '' : '\nTAG: ' + answers.tag
  const message = head + '\n\n' + body + usedTag + '\n\n' + issues
  return message
}

module.exports = formatMessage
