'use strict'

const la = require('lazy-ass')
const check = require('check-more-types')
const snapshot = require('snap-shot')

/* global describe, it */
describe('api', () => {
  const api = require('./valid-message')
  const schema = {
    validate: check.fn,
    parse: check.fn
  }
  it('satisfies api', () => {
    la(check.schema(schema, api), api)
  })
})

describe('parse message', () => {
  const parse = require('./valid-message').parse

  it('is a function', () => {
    la(check.fn(parse))
  })

  it('parses valid message', () => {
    snapshot(parse('feat(foo): new feature'))
  })

  it('parses minor message', () => {
    snapshot(parse('minor(foo): add feature without breaking stuff'))
  })

  it('rejects invalid message', () => {
    const message = 'free form text'
    const parsed = parse(message)
    la(!parsed)
  })

  it('handles "break" type', () => {
    snapshot(parse('break(log): new log format'))
  })

  it('handles "major" type', () => {
    snapshot(parse('major(log): new log format'))
  })

  it('handles "minor" type', () => {
    snapshot(parse('minor(log): add logging'))
  })

  it('handles "patch" type', () => {
    snapshot(parse('patch(log): correct log name'))
  })
})

describe('validate message', () => {
  const validate = require('./valid-message').validate

  it('is a function', () => {
    la(check.fn(validate))
  })

  it('valid message', () => {
    const message = 'feat(foo): new feature'
    var called
    function log () {
      called = true
    }
    la(validate(message, log), 'message is valid')
    la(!called, 'error log not called')
  })

  it('allows plain semver messages', () => {
    la(validate('1.1.0'))
  })

  it('trims message', () => {
    la(validate('1.1.0\n'), 'single new line')
    la(validate('1.1.0\n\n'), 'multiple new lines')
  })

  it('allows semver with tag', () => {
    la(validate('1.1.0-alpha'))
  })

  it('does not allow non-semver', () => {
    la(!validate('1.1.0.0'))
  })
})
