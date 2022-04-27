module.exports = ({ createRouter, lib: { sms, mysql } }) => {
    const router = createRouter()

    router.post('/humano/:id_humano', async (req, res) => { 
        if (!req.body.texto) {
            return res.status(400).json({ errID: "B1S001", error: "o campo texto é requerido" })
        }

        return mysql.selectAllWhere(
            'Humanos', 'id',
            [
                { name: "id", value: req.params.id_humano },
            ]
        ).then(
            async result => {
                if (result[0] === undefined) {
                    return res.status(200).json({ errID: "B1S002", error: "Humano não encontrado" })
                }

                return sms.send(req.params.id_humano, req.body.texto).then(
                    response => res.status(200).json(response.data),
                    error => res.status(500).json({ errID: "B1S003", error })
                )
            },
            error => res.status(400).json({ errID: "B1D002", error })
        )
    })

    return router
}