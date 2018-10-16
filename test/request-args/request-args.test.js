const expect = require('chai').assert
const CDI = require('cdi-node')

const plugin = require('../../src')

const Joi = require('joi')

describe('Request args', function () {
  before(function () {
    this.cdiClass = new CDI()

    plugin(this.cdiClass)

    this.target = this.cdiClass.configure({})

    this.target.schemaJoi = {
      fn: {
        a: Joi.string().required(),
        n: Joi.number().required(),
        h: Joi.number()
      }
    }

    this.target.fn = async ({ args }) => {
      return args
    }
  })

  it('should throw error on requrest because validate Joi schema', async function () {
    try {
      await this.target.fn({ args: { h: 'string' } })
      throw new Error()
    } catch (err) {
      expect.equal(err.message, 'child "a" fails because ["a" is required]. child "n" fails because ["n" is required]. child "h" fails because ["h" must be a number]')
    }
  })

  it('should pass requrest', async function () {
    await this.target.fn({ args: { a: 'string', n: 123, h: 1 } })
  })
})
