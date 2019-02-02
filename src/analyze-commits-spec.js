'use strict'

const la = require('lazy-ass')

/* eslint-env mocha */
describe('analyze-commits', () => {
  const analyzeCommits = require('./analyze-commits')

  it('returns the type', () => {
    const commit = {
      message: 'feat: something new'
    }
    const type = analyzeCommits(null, { commits: [commit] })
    la(type === 'minor', type)
  })

  it('returns the type for break', () => {
    const commit = {
      message: 'break: something different'
    }
    const type = analyzeCommits(null, { commits: [commit] })
    la(type === 'major', type)
  })

  it('returns the largest release type', () => {
    const commits = [{
      message: 'fix: something'
    }, {
      message: 'feat: a feature'
    }, {
      message: 'feat(foo): finished foo'
    }]
    const type = analyzeCommits(null, { commits })
    la(type === 'minor', 'picked largest type', type)
  })

  it('skips unknown commits', () => {
    const commits = [{
      message: 'no semantic message'
    }, {
      message: 'feat: a feature'
    }, {
      message: 'feat(foo): finished foo'
    }, {
      message: 'another one'
    }]
    const type = analyzeCommits(null, { commits })
    la(type === 'minor', 'picked largest type', type)
  })
})
