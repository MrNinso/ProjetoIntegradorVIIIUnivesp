module.exports = ({ createRouter, validacao: { data }, lib: { mysql } }) => {
    const router = createRouter()
    
    router.get('/humano/:id_humano/:data_doacao?', async (req, res) => {
        if (isNaN(+req.params.id_humano))
            return res.status(400).json({ errID: "B1DCH001", error: "id_humano tem que ser um número" })
        ;

        let where = 'id_humano = ?'
        const params = [
            { name: "id_humano", value: req.params.id_humano }
        ]

        if (req.params.data_doacao !== undefined) {
            const d = data(req.params.data, '-')
      
            if (d.errID !== undefined)
                return res.status(400).json(d)
            ;

            where = `${where} AND data_doacao >= ?`
            params.push({ name: "data_doacao", value: req.params.data_doacao })
        }

        return mysql.selectAllWhere(
            'VW_DOACOES', where, params
        ).then(
            result => res.status(200).json(result[0] ?? []),
            error => res.status(500).json(error)
        )
    })

    router.get('/data/:data_doacao', async (req, res) => {
        const d = data(req.params.data, '-')

        if (d.errID !== undefined)
            return res.status(400).json(d)
        ;
        
        return mysql.selectAllWhere(
            'VW_DOACOES', 'data_doacao >= ?',
            [
                { name: "data_doacao", value: d }
            ]
        ).then(
            result => res.status(200).json(result[0] ?? []),
            error => res.status(500).json(error)
        )
    })

    return router
}