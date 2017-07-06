'use strict'

const snapshot = require('snap-shot')

/* global describe, it */
describe('is-public', () => {
  const isPublic = require('./is-public')

  it('determines if commit is public', () => {
    snapshot(isPublic,
      'major', 'break', 'minor', 'feat', 'fix', 'patch', 'chore',
      'anything else'
    )
  })
})
