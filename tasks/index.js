module.exports = (cluster) => {
    // TODO :::
    process.schedule = require('node-schedule')
    process.mysql = require('../libs/mysql')({ config: { mysql: require('../configs/mysql') } })
    process.sms = require('../libs/sms')({ config: { sms: require('../configs/sms') } })

    process.jobSMS = process.schedule.scheduleJob('0 0 0 * * * ', () => {
        process.mysql.selectAllWhere(
            'VW_HUMANOS_DOAR', '', []
        ).then(
            result => {
                // TODO :: melhorar msg
                process.sms.send(result.map(humano => humano.telefone), 'Doar sangue').then(
                    r => {
                        // TODO ::
                    },
                    error => 
                    //TODO :: fazer algo melhor
                    console.log(error)
                )
            },
            error => {
                //TODO :: fazer algo melhor
                console.log(error)
            }
        )
    })
}