module.exports = ({ createRouter, lib: { sms, mysql } }) => {
    const router = createRouter()

    router.post('/doadores', async (req, res) => {
        if (!req.body.texto) {
            res.status(400).json({ errID: "B1SE001", error: "É necessario informar o texto a ser enviado" })
        }
        
        return mysql.selectAllWhere(
            'VW_HUMANOS_DOAR', "", []
        ).then(
            result => {
                if (result.length <= 0)
                    return res.status(204).json({ errID: "B1SE002", error: "Não foram encontrado nenhum doador" })
                ;

                return sms.send(result.map(m => m.telefone), req.body.texto).then(
                    response => res.status(200).json(response.data),
                    error => res.status(500).json({ errID: "B1SE003", error })
                )
            },
            error => res.status(500).json(error)
        )
    })

    router.post('/humano/:id_humano', async (req, res) => { 
        if (!req.body.texto)
            return res.status(400).json({ errID: "B1SE004", error: "o campo texto é requerido" })
        ;

        return mysql.selectAllWhere(
            'Humanos', 'id',
            [
                { name: "id", value: req.params.id_humano },
            ]
        ).then(
            async result => {
                if (result[0] === undefined) {
                    return res.status(204).json({ errID: "B1SE005", error: "Humano não encontrado" })
                }

                return sms.send(result[0].telefone, req.body.texto).then(
                    response => res.status(200).json(response.data),
                    error => res.status(500).json({ errID: "B1SE006", error })
                )
            },
            error => res.status(400).json({ errID: "B1SE007", error })
        )
    })

    return router
}