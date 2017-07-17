#!/usr/bin/env node

const inquirer = require('inquirer')
const simple = require('..')
const confirm = require('inquirer-confirm')
const hr = require('hr')
const ggit = require('ggit')

simple.prompter(inquirer, function (text) {
  console.log('formed the following commit message')
  hr.hr('=')
  console.log(text)
  hr.hr('-')

  confirm('Do you want to commit?')
    .then(ggit.commit.bind(null, text))
    .done()
})
