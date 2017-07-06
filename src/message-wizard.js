'use strict'

const questions = require('./questions')
const updateQuestion = require('./update-question')
const formatMessage = require('./format-message')
const join = require('path').join

function fillQuestions (questions) {
  // assumes commit from the package folder
  const pkg = require(join(process.cwd(), 'package.json'))
  const configuredTag = pkg.publishConfig && pkg.publishConfig.tag
  const currentTag = configuredTag || 'latest'

  const filledQuestions = updateQuestion(questions, {
    name: 'tag',
    property: 'default',
    value: currentTag
  })
  return filledQuestions
}

module.exports = {
  prompter: function prompter (inquirer, cb) {
    console.log('\nLine 1 will be cropped at 100 characters.\n' +
      'All other lines will be wrapped after 100 characters.\n')
    const filledQuestions = fillQuestions(questions)
    inquirer.prompt(filledQuestions, (answers) => cb(formatMessage(answers)))
  }
}

if (!module.parent) {
  (function exampleWizard () {
    const inquirer = require('inquirer')
    module.exports.prompter(inquirer, function (text) {
      console.log('formed the following message')
      console.log(text)
    })
  }())
}
