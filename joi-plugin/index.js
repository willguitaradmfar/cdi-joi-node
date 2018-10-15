const Joi = require('joi');

module.exports = function (cdi, options = { property: 'args', propertySchema: 'schemaJoi'}) {
    cdi.addInterceptorVariable(options.property, function (fnName, args) {
        if (args && this[options.propertySchema] && this[options.propertySchema][fnName]) {
            const err = Joi.validate(args[options.property] || {}, this[options.propertySchema][fnName], {
                abortEarly: false
            })

            if (err && err.error) throw err.error

            return args[options.property]
        }
        return args[options.property]
    })
}