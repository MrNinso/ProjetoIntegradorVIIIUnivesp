module.exports = new Promise(async (resolve, reject) => {
    const requireFolder = require('../requireFolder')()
    
    const importsRequirePromises = [
        requireFolder.requireAsync('./validacoes'),
        requireFolder.requireAsync('./configs'),
        requireFolder.requireAsync('./libs'),
    ]

    const imports = await Promise.all(importsRequirePromises).then(
        (result) => {
            const imp = {}
            
            imp.createRouter = require('express').Router

            imp.validacao = new Object(null)
            for (const validacao of result[0]) {
                imp.validacao[validacao.name] = validacao.exported
            }

            imp.config = new Object(null)
            for (const config of result[1]) {
                imp.config[config.name] = config.exported
            }

            imp.lib = new Object(null)
            for (const lib of result[2]) {
                imp.lib[lib.name] = lib.exported(imp)
            }

            return imp
        }
    )

    Promise.all([requireFolder.requireAsync('./routes/v1')]).then(async (result) => {
        const router = imports.createRouter()

        result.forEach(r => {
            r.forEach(route => {
                router.use(
                    route.file.slice(0, -3).replace('./routes', '').replace('/index', ''),
                    route.exported(imports)
                )
            })
        })

        resolve(router)
    }).catch(reject)
})