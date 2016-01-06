const la = require('lazy-ass')
const is = require('check-more-types')

function updateQuestion (questions, name, property, value) {
  questions.forEach(function (q) {
    if (q.name === name) {
      q[property] = value
    }
  })
}

function updateQuestions (questions, updates) {
  la(is.array(questions), 'expected list of questions', questions)

  if (is.object(updates)) {
    updates = [updates]
  }

  la(is.array(updates), 'expected list of updates', updates)
  updates.forEach(function (update) {
    updateQuestion(questions, update.name, update.property, update.value)
  })
  return questions
}

module.exports = updateQuestions
