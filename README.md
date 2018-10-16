# cdi-joi-node 

[![Build Status](https://travis-ci.org/willguitaradmfar/cdi-joi-node.svg?branch=master)](https://travis-ci.org/willguitaradmfar/cdi-joi-node)


Library that assists in joi validator.

## Installation

### Requirements
* NodeJS 8+

`$ npm i cdi-joi-node`

## Usage

### Simple

```js
const CDI = require('cdi-node')

const plugin = require('cdi-joi-node')

const cdi = new CDI()

plugin(cdi)

const _module = cdi.configure({})

_module.schemaJoi = {
    fn: {
        a: Joi.string().required(),
        n: Joi.number().required(),
        h: Joi.number()
    }
}

_module.fn = ({ args }) => {
    return new Promise((resolve, reject) => {
        return resolve(args)
    })
}

try{
    await _module.fn({ args: { h : 'string'} })
} catch(err){
    // err: 'child "a" fails because ["a" is required]. child "n" fails because ["n" is required]. child "h" fails because ["h" must be a number]'
}

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)