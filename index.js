const plugin = require('./joi-plugin')


var cdiNode = require("cdi-node")

var cdi = new cdiNode()

plugin(cdi)

const a = cdi.configure({})

a.teste = async function ({ args })  {
    return 'a'
}

a.teste().then(console.log).catch(console.error)
