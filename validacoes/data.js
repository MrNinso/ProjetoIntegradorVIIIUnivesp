module.exports = (data, separador) => {
    const regex = new RegExp(`(\\d{4})${separador}([01]\\d)${separador}([0-3]\\d)`)

    if (!regex.test(data))
        return { errID: "BVDT001", error: `Data tem que esta no formato yyyy${separador}mm${separador}dd` }
    ;

    const [_, year, month, day ] = data.match(regex)

    if (isNaN(+year) || isNaN(+month) || isNaN(+day))
        return { errID: "BVDT002", error: `Data tem que esta no formato yyyy${separador}mm${separador}dd` }
    ;

    if ((+day) > 31 || (+month) > 12 )
        return { errID: "BVDT003", error: `Data tem que esta no formato yyyy${separador}mm${separador}dd` }
    ;

    return { data: new Date(+year, month -1, +day) }
}