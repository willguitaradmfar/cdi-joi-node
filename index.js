const plugin = require('./joi-plugin')

const Joi = require('joi')

const CDI = require('cdi-node')

const cdi = new CDI()

plugin(cdi, {
    property: 'args',
    propertySchema: 'schemaJoi'
})

const controller = cdi.configure({})

controller.schemaJoi = {
    teste: {
        a: Joi.string().required(),
        n: Joi.number().required(),
        h: Joi.number()
    }
}

controller.teste = async function ({ args }) {
    try {
        return args
    } catch (err) {
        throw err
    }
}

controller
    .teste({
        args: {
            a: 'hello',
            n: 15,
            h: 1
        }
    })
    .then(a => {
        console.log(a)
    })
    .catch(err => {
        console.error(err);
    })
