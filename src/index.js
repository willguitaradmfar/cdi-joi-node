const Joi = require('joi')

module.exports = function (cdi, options = { property: 'args', propertySchema: 'schemaJoi' }) {
  cdi.addInterceptorVariable(options.property, function (fnName, args = {}) {
    if (args && this[options.propertySchema] && this[options.propertySchema][`${fnName}Request`]) {
      const err = Joi.validate(args[options.property] || {}, this[options.propertySchema][`${fnName}Request`], {
        abortEarly: false
      })

      if (err && err.error) throw err.error

      return args[options.property]
    }

    if (args && this[options.propertySchema]) {
      return this[options.propertySchema]
    }
  })

  cdi.setInterceptorDone(function (response, fnName, args = {}) {
    if (args && this[options.propertySchema] && this[options.propertySchema][`${fnName}Response`]) {
      const err = Joi.validate(response || {}, this[options.propertySchema][`${fnName}Response`], {
        abortEarly: false
      })

      if (err && err.error) throw err.error

      return response
    } else {
      return response
    }
  })
}
