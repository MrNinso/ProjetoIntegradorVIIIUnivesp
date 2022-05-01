module.exports = (telefone) => {
    if (isNaN(+telefone))
        return { errID: "BVTL001", error: "O telefone tem que se formato" }
    ;

    if (telefone.length !== 11)
        return { errID: "BVTL002", error: "O telefone tem que ter 11 digitos numericos" }
    ;

    return {}
}