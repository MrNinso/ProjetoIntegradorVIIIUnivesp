module.exports = ({ createRouter, lib: { mysql } }) => {
    const router = createRouter()

    router.get('/humano/:id_humano', async (req, res) => 
        mysql.selectAllWhere(
            'VW_SMS_HUMANOS', 'id_humano = ?', [ { name: 'id_humano', value: req.params.id_humano} ]
        ).then(
            result => res.status(200).json(result),
            error => res.status(500).json(error)
        )
    )

    return router
}