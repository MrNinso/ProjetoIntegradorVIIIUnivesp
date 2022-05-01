module.exports = (nome) => {
    if (!(nome instanceof string)) 
        return { errID: "BVNO001", error: "O nome tem que ser uma string" }
    ;

    if (nome.length < 2)
        return { errID: "BVNO002", error: "O nome é invalido" }
    ;

    return {}
}