const expect = require('chai').assert
const CDI = require('cdi-node')

const plugin = require('../../src')

const Joi = require('joi')

describe('Response args', function () {
  before(function () {
    this.cdiClass = new CDI()

    plugin(this.cdiClass)

    this.target = this.cdiClass.configure({})

    this.target.schemaJoi = {
      fn: {
        a: Joi.number().strict().required(),
        b: Joi.number().strict().required()
      },
      _fn: {
        sum: Joi.number().strict().required()
      },
      fn2: {
        a: Joi.number().strict().required(),
        b: Joi.number().strict().required()
      },
      _fn2: {
        sum: Joi.number().strict().required()
      }
    }

    this.target.fn = async ({ args }) => {
      return {
        response: args.a + args.b
      }
    }

    this.target.fn2 = async ({ args }) => {
      return {
        sum: args.a + args.b
      }
    }
  })

  it('should throw error on response because validate Joi schema', async function () {
    try {
      await this.target.fn({ args: { a: 2, b: 8 } })
      throw new Error()
    } catch (err) {
      expect.equal(err.message, 'child "sum" fails because ["sum" is required]. "response" is not allowed')
    }
  })

  it('should pass response', async function () {
    await this.target.fn2({ args: { a: 2, b: 8 } })
  })
})
