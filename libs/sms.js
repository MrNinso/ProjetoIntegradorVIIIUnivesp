module.exports = ({ config: { sms } }) => {
    sms.lib = require('axios')

    // TODO :: melhorar o error
    sms.send = async (phone, text) => sms.lib.post(
        sms.url, { phone, text }, { headers: { Authorization: sms.token } }
    )

    return sms
}