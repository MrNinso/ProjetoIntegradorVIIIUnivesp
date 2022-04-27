module.exports = ({ createRouter, lib: { mysql } }) => {
    const router = createRouter()

    //TODO :: Validar humano
    router.post('/',async (req, res) => 
        mysql.execProcecure(
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
    )

    return router
}