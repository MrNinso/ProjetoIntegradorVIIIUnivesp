module.exports = ({ createRouter, lib: { mysql } }) => {
    const router = createRouter()

    router.post('/:id_humano',async (req, res) => 
        mysql.execProcecure(
            'SPU_DOACOES_INSERIR',
            [
                { name: "pId_usuario", value: req.params.id_humano },
            ]
        ).then(
            result => result[0].OKAY === 1 ? 
                res.status(200).json({})
                : res.status(500).json({ errID: "B1D001", error: "erro inesperado" }),
            error => res.status(400).json({ errID: "B1D002", error })
        )
    )

    return router
}