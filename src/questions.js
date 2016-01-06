const questions = [
  {
    type: 'list',
    name: 'type',
    message: 'Select the type of change that you\'re committing:',
    choices: [
      {
        name: 'feat:     A new feature',
        value: 'feat'
      }, {
        name: 'fix:      A bug fix',
        value: 'fix'
      }, {
        name: 'chore:    Changes to the build process or auxiliary tools\n' +
              '            and libraries such as documentation generation',
        value: 'chore'
      }
    ]
  }, {
    type: 'input',
    name: 'scope',
    message: 'Denote the scope of this change (db, api, cli, etc.):\n'
  }, {
    type: 'input',
    name: 'subject',
    message: 'Write a short, imperative tense description of the change:\n'
  }, {
    type: 'input',
    name: 'body',
    message: 'Provide a longer description of the change:\n'
  }, {
    type: 'input',
    name: 'issues',
    message: 'List issues this commit resolves (fixes #2, closes #14):\n'
  }, {
    type: 'confirm',
    name: 'breaking',
    message: 'Is this a major breaking change:\n',
    default: false
  }, {
    type: 'input',
    name: 'tag',
    message: 'Should this be published under different tag?\n' +
             '  This will let users still install the current latest,\n' +
             '  but eary adapters can `npm install <name>@<tag>`\n',
    default: 'latest'
  }
]

module.exports = questions
