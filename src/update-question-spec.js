const la = require('lazy-ass')
const is = require('check-more-types')

/* global describe, it */
describe('update question', () => {
  const update = require('./update-question')
  it('is a function', () => {
    la(is.fn(update))
  })

  it('updates default in 1 question with object', () => {
    var questions = [{
      name: 'foo',
      default: 'foo'
    }]
    const options = {
      name: 'foo',
      property: 'default',
      value: 'bar'
    }
    var updated = update(questions, options)
    la(is.array(updated), 'returns a list of questions', updated)
    la(updated.length === 1, 'single question')
    la(updated[0].name === 'foo', 'name is unchanged', updated)
    la(updated[0].default === 'bar', 'default is changed', updated)
  })
})
