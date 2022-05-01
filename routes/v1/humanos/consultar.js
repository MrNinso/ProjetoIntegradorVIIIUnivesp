module.exports = ({ createRouter, validacao: { cpf, tipoSangue }, lib: { mysql } }) => {
    const router = createRouter()
    
    router.get('/cpf/:cpf', async (req, res) => {
        const cpfCheck = cpf(req.params.cpf)
      
        if (cpfCheck.errID !== undefined)
            return res.status(400).json(cpfCheck)
        ;
        
        return mysql.selectAllWhere(
            'Humanos', 'cpf = ?',
            [
                { name: "cpf", value: req.params.cpf }
            ]
        ).then(
            result => res.status(200).json(result[0] ?? []),
            error => res.status(500).json(error)
        )
    })

    router.get('/tipo_sangue/:tipo', async (req, res) => {
        req.params.tipo = `${req.params.tipo}`.toUpperCase()
        const tipoSangueCheck = tipoSangue(req.params.tipo)
      
        if (tipoSangueCheck.errID !== undefined)
            return res.status(400).json(tipoSangueCheck)
        ;
        
        return mysql.selectAllWhere(
            'Humanos', 'tipo_sangue = ?',
            [
                { name: "tipo_sangue", value: req.params.tipo }
            ]
        ).then(
            result => res.status(200).json(result),
            error => res.status(500).json(error)
        )
    })

    router.get('/doadores', async (req, res) => {
        return mysql.selectAllWhere(
            'VW_HUMANOS_DOAR', "", []
        ).then(
            result => res.status(200).json(result[0] ?? []),
            error => res.status(500).json(error)
        )
    })

    return router
}