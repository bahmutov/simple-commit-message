const la = require('lazy-ass')
const check = require('check-more-types')

/* global describe, it */
describe('top level api', () => {
  const api = require('./index')
  it('has name', () => {
    la(api.name === 'simple', api.name)
  })

  it('has expected methods', () => {
    const schema = {
      validate: check.fn,
      parse: check.fn,
      prompter: check.fn
    }
    la(check.schema(schema, api))
  })
})
