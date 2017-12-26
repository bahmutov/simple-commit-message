'use strict'

const la = require('lazy-ass')

/* eslint-env mocha */
describe('analyze-commits', () => {
  const analyzeCommits = require('./analyze-commits')

  it('returns the type', () => {
    const commit = {
      message: 'feat: something new'
    }
    const type = analyzeCommits(null, commit)
    la(type === 'minor', type)
  })

  it('returns the type for break', () => {
    const commit = {
      message: 'break: something different'
    }
    const type = analyzeCommits(null, commit)
    la(type === 'major', type)
  })
})
