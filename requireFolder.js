module.exports = () => {
    const lib = {
        glob: require('glob'),
        path: require('path'),
    }

    lib.requireAsync = async (requirePath) => new Promise(async (resolve, reject) => {
        const promises = []
    
        lib.glob.sync(`${requirePath}/**/*.js`).forEach(file => {
            promises.push(
                (async () => {
                    return {
                        file,
                        name: lib.path.basename(file).replace('.js', ''),
                        exported: require(lib.path.resolve(file))
                    }
                })()
            )
        })

        return Promise.all(promises).then(resolve, reject)
    })

    return lib
}