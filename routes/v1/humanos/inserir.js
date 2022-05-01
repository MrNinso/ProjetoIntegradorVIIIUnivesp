module.exports = ({ createRouter, validacao: { nome, tipoSangue, rh, cpf, telefone }, lib: { mysql } }) => {
    const router = createRouter()

    router.post('/',async (req, res) => { 
        const validacoes = new Object(null)

        validacoes.nome = nome
        validacoes.tipo_sangue = tipoSangue
        validacoes.rh = rh
        validacoes.cpf = cpf
        validacoes.telefone = telefon

        for (const prop in req.body) {
            const error = validacao[prop](req.body[prop])

            if (error.errID !== undefined)
                return res.status(400).json(error)
            ;
        }

        return mysql.execProcecure(
            'SPU_HUMANOS_INSERIR',
            [
                { name: "pNome",        value: req.body.nome },
                { name: "pTipo_sangue", value: req.body.tipo_sangue },
                { name: "pRh",          value: req.body.rh },
                { name: "pCpf",         value: req.body.cpf },
                { name: "pTelefone",    value: req.body.telefone },
            ]
        ).then(
            result => result[0].OKAY === 1 ? 
                res.status(200).json({})
                : res.status(500).json({ errID: "B1HI001", error: "erro inesperado" }),
            error => res.status(400).json({ errID: "B1HI002", error })
        )
    })

    return router
}